from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongoengine.errors import NotUniqueError, ValidationError, DoesNotExist
from ..models.org import Organization
from ..models.user import User
import re

orgs_bp = Blueprint('orgs', __name__, url_prefix='/api/orgs')

def create_slug(name):
    """Create a URL-friendly slug from organization name"""
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)  # Replace non-alphanumeric with hyphens
    slug = slug.strip('-')  # Remove leading/trailing hyphens
    return slug


#CREATE ORGANIZATION
@orgs_bp.route('/', methods=['POST'])
@jwt_required()  # User must be logged in
def create_organization():
    """Create a new organization"""
    try:
        # Get current user from JWT token
        current_user_id = get_jwt_identity()
        current_user = User.objects.get(id=current_user_id)
        
        # Get data from request
        data = request.get_json()
        
        # Validate required fields
        if not data.get('name'):
            return jsonify({'error': 'Organization name is required'}), 400
        
        if not data.get('email'):
            return jsonify({'error': 'Organization email is required'}), 400
        
        # Create slug from name
        slug = create_slug(data['name'])
        
        # Create organization object
        org = Organization(
            name=data['name'],
            slug=slug,
            description=data.get('description', ''),
            logo_url=data.get('logo_url', ''),
            email=data['email'],
            phone=data.get('phone', ''),
            website=data.get('website', ''),
            address=data.get('address', ''),
            city=data.get('city', ''),
            state=data.get('state', ''),
            country=data.get('country', ''),
            postal_code=data.get('postal_code', ''),
            owner=current_user,  # Set current user as owner
            admins=[],  # Empty initially
            members=[]  # Empty initially
        )
        
        # Add social links if provided
        if data.get('social_links'):
            org.social_links = data['social_links']
        
        # Save to database
        org.save()
        
        return jsonify({
            'message': 'Organization created successfully',
            'organization': org.to_json()
        }), 201
        
    except NotUniqueError:
        return jsonify({'error': 'Organization with this name or email already exists'}), 409
    
    except ValidationError as e:
        return jsonify({'error': f'Validation error: {str(e)}'}), 400
    
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


#GET ALL ORGANIZATIONS
@orgs_bp.route('/', methods=['GET'])
def get_all_organizations():
    
    try:
        # Get query parameters
        is_verified = request.args.get('is_verified')
        limit = int(request.args.get('limit', 50))
        skip = int(request.args.get('skip', 0))
        
        # Build query
        query = {}
        if is_verified is not None:
            query['is_verified'] = is_verified.lower() == 'true'
        
        # Get organizations from database
        orgs = Organization.objects(**query).skip(skip).limit(limit)
        
        # Convert to JSON
        orgs_list = [org.to_json() for org in orgs]
        
        return jsonify({
            'count': len(orgs_list),
            'organizations': orgs_list
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


#GET SINGLE ORGANIZATION
@orgs_bp.route('/<org_id>', methods=['GET'])
def get_organization(org_id):
    """Get a single organization by ID"""
    try:
        org = Organization.objects.get(id=org_id)
        return jsonify(org.to_json()), 200
        
    except DoesNotExist:
        return jsonify({'error': 'Organization not found'}), 404
    
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


#GET ORGANIZATION BY SLUG
@orgs_bp.route('/slug/<slug>', methods=['GET'])
def get_organization_by_slug(slug):
    """Get organization by slug (URL-friendly name)"""
    try:
        org = Organization.objects.get(slug=slug)
        return jsonify(org.to_json()), 200
        
    except DoesNotExist:
        return jsonify({'error': 'Organization not found'}), 404
    
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


#UPDATE ORGANIZATION
@orgs_bp.route('/<org_id>', methods=['PUT', 'PATCH'])
@jwt_required()
def update_organization(org_id):
    """
    Update organization details
    Only owner and admins can update
    """
    try:
        # Get current user
        current_user_id = get_jwt_identity()
        current_user = User.objects.get(id=current_user_id)
        
        # Get organization
        org = Organization.objects.get(id=org_id)
        
        # Check permissions (only owner and admins can update)
        if not org.is_admin(current_user):
            return jsonify({'error': 'You do not have permission to update this organization'}), 403
        
        # Get update data
        data = request.get_json()
        
        # Update fields
        if 'name' in data:
            org.name = data['name']
            org.slug = create_slug(data['name'])
        
        if 'description' in data:
            org.description = data['description']
        
        if 'logo_url' in data:
            org.logo_url = data['logo_url']
        
        if 'email' in data:
            org.email = data['email']
        
        if 'phone' in data:
            org.phone = data['phone']
        
        if 'website' in data:
            org.website = data['website']
        
        if 'address' in data:
            org.address = data['address']
        
        if 'city' in data:
            org.city = data['city']
        
        if 'state' in data:
            org.state = data['state']
        
        if 'country' in data:
            org.country = data['country']
        
        if 'postal_code' in data:
            org.postal_code = data['postal_code']
        
        if 'social_links' in data:
            org.social_links = data['social_links']
        
        # Save changes
        org.save()
        
        return jsonify({
            'message': 'Organization updated successfully',
            'organization': org.to_json()
        }), 200
        
    except DoesNotExist:
        return jsonify({'error': 'Organization not found'}), 404
    
    except ValidationError as e:
        return jsonify({'error': f'Validation error: {str(e)}'}), 400
    
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


#DELETE ORGANIZATION
@orgs_bp.route('/<org_id>', methods=['DELETE'])
@jwt_required()
def delete_organization(org_id):
    """
    Delete organization
    Only owner can delete
    """
    try:
        # Get current user
        current_user_id = get_jwt_identity()
        current_user = User.objects.get(id=current_user_id)
        
        # Get organization
        org = Organization.objects.get(id=org_id)
        
        # Check permissions (only owner can delete)
        if not org.is_owner(current_user):
            return jsonify({'error': 'Only the owner can delete this organization'}), 403
        
        # Delete organization
        org.delete()
        
        return jsonify({'message': 'Organization deleted successfully'}), 200
        
    except DoesNotExist:
        return jsonify({'error': 'Organization not found'}), 404
    
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


#member management routes
@orgs_bp.route('/<org_id>/members', methods=['POST'])
@jwt_required()
def add_member(org_id):
    """Add a member to organization"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.objects.get(id=current_user_id)
        
        org = Organization.objects.get(id=org_id)
        
        # Only admins and owner can add members
        if not org.is_admin(current_user):
            return jsonify({'error': 'You do not have permission to add members'}), 403
        
        data = request.get_json()
        user_to_add = User.objects.get(id=data['user_id'])
        role = data.get('role', 'member')
        
        if role == 'admin':
            success = org.add_admin(user_to_add)
        else:
            success = org.add_member(user_to_add)
        
        if success:
            return jsonify({'message': f'User added as {role} successfully'}), 200
        else:
            return jsonify({'error': 'User already has this role'}), 400
            
    except DoesNotExist:
        return jsonify({'error': 'Organization or user not found'}), 404
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


@orgs_bp.route('/<org_id>/members/<user_id>', methods=['DELETE'])
@jwt_required()
def remove_member(org_id, user_id):
    """Remove a member from organization"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.objects.get(id=current_user_id)
        
        org = Organization.objects.get(id=org_id)
        
        # Only admins and owner can remove members
        if not org.is_admin(current_user):
            return jsonify({'error': 'You do not have permission to remove members'}), 403
        
        user_to_remove = User.objects.get(id=user_id)
        
        # Try removing from both admin and member lists
        removed_admin = org.remove_admin(user_to_remove)
        removed_member = org.remove_member(user_to_remove)
        
        if removed_admin or removed_member:
            return jsonify({'message': 'User removed successfully'}), 200
        else:
            return jsonify({'error': 'User is not a member of this organization'}), 400
            
    except DoesNotExist:
        return jsonify({'error': 'Organization or user not found'}), 404
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


#get org members
@orgs_bp.route('/<org_id>/members', methods=['GET'])
def get_members(org_id):
    """Get all members and admins of an organization"""
    try:
        org = Organization.objects.get(id=org_id)
        
        return jsonify({
            'owner': {
                'id': str(org.owner.id),
                'name': org.owner.name if hasattr(org.owner, 'name') else 'N/A'
            },
            'admins': [
                {'id': str(admin.id), 'name': admin.name if hasattr(admin, 'name') else 'N/A'} 
                for admin in org.admins
            ],
            'members': [
                {'id': str(member.id), 'name': member.name if hasattr(member, 'name') else 'N/A'} 
                for member in org.members
            ]
        }), 200
        
    except DoesNotExist:
        return jsonify({'error': 'Organization not found'}), 404
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500