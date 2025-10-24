from datetime import datetime
from mongoengine import (
    Document, 
    StringField, 
    EmailField, 
    URLField, 
    ListField, 
    ReferenceField,
    DateTimeField,
    BooleanField,
    IntField
)
from .user import User  # Assuming User model exists

class Organization(Document):
    
    meta = {
        'collection': 'organizations',
        'indexes': [
            'name',
            'email',
            'is_verified',
            'created_at'
        ]
    }
    
    # ===== BASIC INFORMATION =====
    name = StringField(
        required=True, 
        unique=True, 
        max_length=200,
        help_text="Official name of the organization"
    )
    
    slug = StringField(
        required=True,
        unique=True,
        max_length=200,
        help_text="URL-friendly version of name (e.g., 'my-org')"
    )
    
    description = StringField(
        max_length=2000,
        help_text="Brief description of the organization"
    )
    
    logo_url = URLField(
        help_text="URL to organization's logo image"
    )

    email = EmailField(
        required=True,
        unique=True,
        help_text="Primary contact email"
    )
    
    phone = StringField(
        max_length=20,
        help_text="Contact phone number"
    )
    
    website = URLField(
        help_text="Organization's official website"
    )
    
    
    address = StringField(
        max_length=500,
        help_text="Physical address"
    )
    
    city = StringField(max_length=100)
    state = StringField(max_length=100)
    country = StringField(max_length=100)
    postal_code = StringField(max_length=20)
    
   
    social_links = {
        'twitter': URLField(),
        'linkedin': URLField(),
        'github': URLField(),
        'facebook': URLField(),
        'instagram': URLField()
    }
    
    
    owner = ReferenceField(
        User,
        required=True,
        help_text="User who created/owns this organization"
    )
    
    admins = ListField(
        ReferenceField(User),
        default=list,
        help_text="Users with admin privileges"
    )
    
    members = ListField(
        ReferenceField(User),
        default=list,
        help_text="Regular members of the organization"
    )
    
    
    is_verified = BooleanField(
        default=False,
        help_text="Whether org is verified by platform admins"
    )
    
    is_active = BooleanField(
        default=True,
        help_text="Whether organization is currently active"
    )
    
   
    hackathons_count = IntField(
        default=0,
        help_text="Total number of hackathons hosted"
    )
    
    
    created_at = DateTimeField(
        default=datetime.utcnow,
        help_text="When the organization was created"
    )
    
    updated_at = DateTimeField(
        default=datetime.utcnow,
        help_text="Last update timestamp"
    )
    
    
    def save(self, *args, **kwargs):
        """Override save to update the 'updated_at' timestamp"""
        self.updated_at = datetime.utcnow()
        return super(Organization, self).save(*args, **kwargs)
    
    def add_admin(self, user):
        """Add a user as admin if not already an admin"""
        if user not in self.admins:
            self.admins.append(user)
            self.save()
            return True
        return False
    
    def remove_admin(self, user):
        """Remove a user from admins"""
        if user in self.admins:
            self.admins.remove(user)
            self.save()
            return True
        return False
    
    def add_member(self, user):
        """Add a user as member"""
        if user not in self.members and user not in self.admins:
            self.members.append(user)
            self.save()
            return True
        return False
    
    def remove_member(self, user):
        """Remove a user from members"""
        if user in self.members:
            self.members.remove(user)
            self.save()
            return True
        return False
    
    def is_owner(self, user):
        """Check if user is the owner"""
        return self.owner == user
    
    def is_admin(self, user):
        """Check if user is an admin or owner"""
        return user == self.owner or user in self.admins
    
    def is_member(self, user):
        """Check if user is a member, admin, or owner"""
        return user == self.owner or user in self.admins or user in self.members
    
    def __str__(self):
        """String representation"""
        return f"Organization: {self.name}"
    
    def to_json(self):
        """Convert to JSON-friendly dictionary"""
        return {
            'id': str(self.id),
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
            'logo_url': self.logo_url,
            'email': self.email,
            'phone': self.phone,
            'website': self.website,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'postal_code': self.postal_code,
            'social_links': self.social_links,
            'is_verified': self.is_verified,
            'is_active': self.is_active,
            'hackathons_count': self.hackathons_count,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    