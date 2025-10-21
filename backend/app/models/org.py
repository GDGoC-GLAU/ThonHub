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
    """
    Organization Model - Represents organizations that host hackathons
    
    This model stores all information about organizations including:
    - Basic info (name, description, logo)
    - Contact details
    - Social links
    - Members and admins
    - Verification status
    """
    
    # Meta configuration for MongoDB collection
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