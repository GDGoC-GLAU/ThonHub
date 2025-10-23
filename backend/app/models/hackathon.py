from datetime import datetime
from mongoengine import (
    Document,
    EmbeddedDocument,
    StringField,
    EmailField,
    URLField,
    ListField,
    EmbeddedDocumentField,
    ReferenceField,
    DateTimeField,
    BooleanField,
    IntField,
    FloatField,
    DictField
)
from .user import User
from .org import Organization
from .team import Team

# Embedded Documents (Sub-schemas)

class Prize(EmbeddedDocument):
    """Prize information for hackathon"""
    position = StringField(required=True, help_text="1st, 2nd, 3rd, etc.")
    title = StringField(required=True, help_text="Prize title/name")
    amount = FloatField(help_text="Prize money amount")
    currency = StringField(default="USD", max_length=3)
    description = StringField(max_length=1000, help_text="Prize details")
    
    def to_json(self):
        return {
            'position': self.position,
            'title': self.title,
            'amount': self.amount,
            'currency': self.currency,
            'description': self.description
        }


class Sponsor(EmbeddedDocument):
    """Sponsor information"""
    name = StringField(required=True)
    logo_url = URLField()
    website = URLField()
    tier = StringField(
        choices=['platinum', 'gold', 'silver', 'bronze', 'partner'],
        default='bronze'
    )
    description = StringField(max_length=500)
    
    def to_json(self):
        return {
            'name': self.name,
            'logo_url': self.logo_url,
            'website': self.website,
            'tier': self.tier,
            'description': self.description
        }


class Track(EmbeddedDocument):
    """Hackathon track/category"""
    name = StringField(required=True, help_text="Track name (e.g., AI/ML, Web Dev)")
    description = StringField(max_length=1000)
    icon = StringField(help_text="Icon name or emoji")
    color = StringField(help_text="Color code for UI")
    
    def to_json(self):
        return {
            'name': self.name,
            'description': self.description,
            'icon': self.icon,
            'color': self.color
        }


class FAQ(EmbeddedDocument):
    """Frequently Asked Question"""
    question = StringField(required=True)
    answer = StringField(required=True)
    
    def to_json(self):
        return {
            'question': self.question,
            'answer': self.answer
        }


class Schedule(EmbeddedDocument):
    """Event schedule item"""
    title = StringField(required=True)
    description = StringField(max_length=500)
    start_time = DateTimeField(required=True)
    end_time = DateTimeField()
    location = StringField(help_text="Physical location or meeting link")
    event_type = StringField(
        choices=['workshop', 'keynote', 'networking', 'judging', 'ceremony', 'other'],
        default='other'
    )
    
    def to_json(self):
        return {
            'title': self.title,
            'description': self.description,
            'start_time': self.start_time.isoformat() if self.start_time else None,
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'location': self.location,
            'event_type': self.event_type
        }


class JudgingCriteria(EmbeddedDocument):
    """Criteria for judging submissions"""
    name = StringField(required=True, help_text="e.g., Innovation, Design")
    description = StringField(max_length=500)
    weight = IntField(default=1, help_text="Weight/importance (1-10)")
    
    def to_json(self):
        return {
            'name': self.name,
            'description': self.description,
            'weight': self.weight
        }


# Main Hackathon Model

class Hackathon(Document):
    """
    Hackathon Model - Complete schema for hackathon events
    
    Stores all information about a hackathon including:
    - Basic details
    - Dates and deadlines
    - Location and mode
    - Registration settings
    - Prizes and sponsors
    - Participants and teams
    - Judging criteria
    - Schedule
    """
    
    # Meta configuration
    meta = {
        'collection': 'hackathons',
        'indexes': [
            'slug',
            'status',
            'mode',
            'start_date',
            'registration_deadline',
            'is_published',
            'organization'
        ]
    }
    
    # Basic Information
    name = StringField(
        required=True,
        max_length=200,
        help_text="Hackathon name"
    )
    
    slug = StringField(
        required=True,
        unique=True,
        max_length=200,
        help_text="URL-friendly identifier"
    )
    
    tagline = StringField(
        max_length=200,
        help_text="Short catchy tagline"
    )
    
    description = StringField(
        required=True,
        help_text="Full description of the hackathon"
    )
    
    theme = StringField(
        max_length=200,
        help_text="Main theme (e.g., 'Climate Change', 'Healthcare')"
    )
    
    # Visual Assets
    logo_url = URLField(help_text="Hackathon logo")
    banner_url = URLField(help_text="Banner/cover image")
    images = ListField(URLField(), default=list, help_text="Additional images")
    
    # Organization & Ownership
    organization = ReferenceField(
        Organization,
        required=False,
        help_text="Hosting organization"
    )
    
    organizers = ListField(
        ReferenceField(User),
        default=list,
        help_text="Users who can manage this hackathon"
    )
    
    created_by = ReferenceField(
        User,
        required=True,
        help_text="User who created this hackathon"
    )
    
    # Dates & Timeline
    registration_start = DateTimeField(
        help_text="When registration opens"
    )
    
    registration_deadline = DateTimeField(
        required=True,
        help_text="Last date to register"
    )
    
    start_date = DateTimeField(
        required=True,
        help_text="Hackathon start date and time"
    )
    
    end_date = DateTimeField(
        required=True,
        help_text="Hackathon end date and time"
    )
    
    submission_deadline = DateTimeField(
        help_text="Project submission deadline"
    )
    
    result_date = DateTimeField(
        help_text="When results will be announced"
    )
    
    # Mode & Location
    mode = StringField(
        required=True,
        choices=['online', 'offline', 'hybrid'],
        default='online',
        help_text="Event mode"
    )
    
    # Physical location (for offline/hybrid)
    venue_name = StringField(max_length=200)
    venue_address = StringField(max_length=500)
    city = StringField(max_length=100)
    state = StringField(max_length=100)
    country = StringField(max_length=100)
    
    # Online details
    event_url = URLField(help_text="Virtual event platform URL")
    discord_url = URLField(help_text="Discord server")
    slack_url = URLField(help_text="Slack workspace")
    
    # Participation Settings
    max_participants = IntField(
        help_text="Maximum number of participants (0 = unlimited)"
    )
    
    min_team_size = IntField(
        default=1,
        help_text="Minimum team size"
    )
    
    max_team_size = IntField(
        default=4,
        help_text="Maximum team size"
    )
    
    allow_team_formation = BooleanField(
        default=True,
        help_text="Allow participants to form teams"
    )
    
    require_approval = BooleanField(
        default=False,
        help_text="Require admin approval for registration"
    )
    
    # Eligibility
    eligible_regions = ListField(
        StringField(),
        default=list,
        help_text="Eligible countries/regions (empty = all)"
    )
    
    min_age = IntField(
        help_text="Minimum age requirement"
    )
    
    eligibility_criteria = StringField(
        max_length=1000,
        help_text="Additional eligibility requirements"
    )
    
    # Registration Fields
    custom_registration_fields = ListField(
        DictField(),
        default=list,
        help_text="Custom fields for registration form"
    )
    # Example: [{"name": "github_url", "type": "url", "required": true}]
    
    # Prizes
    prizes = ListField(
        EmbeddedDocumentField(Prize),
        default=list
    )
    
    total_prize_pool = FloatField(
        default=0.0,
        help_text="Total prize money"
    )
    
    prize_currency = StringField(
        default="USD",
        max_length=3
    )
    
    # Sponsors
    sponsors = ListField(
        EmbeddedDocumentField(Sponsor),
        default=list
    )
    
    # Tracks/Categories
    tracks = ListField(
        EmbeddedDocumentField(Track),
        default=list
    )
    
    # Participants & Teams
    participants = ListField(
        ReferenceField(User),
        default=list,
        help_text="Registered participants"
    )
    
    teams = ListField(
        ReferenceField(Team),
        default=list,
        help_text="Registered teams"
    )
    
    pending_participants = ListField(
        ReferenceField(User),
        default=list,
        help_text="Participants awaiting approval"
    )
    
    # Judges
    judges = ListField(
        ReferenceField(User),
        default=list
    )
    
    judging_criteria = ListField(
        EmbeddedDocumentField(JudgingCriteria),
        default=list
    )
    
    # Schedule
    schedule = ListField(
        EmbeddedDocumentField(Schedule),
        default=list
    )
    
    # FAQs
    faqs = ListField(
        EmbeddedDocumentField(FAQ),
        default=list
    )
    
    # Rules
    rules = StringField(
        help_text="Hackathon rules and guidelines"
    )
    
    code_of_conduct = StringField(
        help_text="Code of conduct for participants"
    )
    
    # Submission Requirements
    submission_guidelines = StringField(
        help_text="Project submission guidelines"
    )
    
    required_submission_fields = ListField(
        StringField(),
        default=['project_name', 'description', 'demo_url', 'source_code'],
        help_text="Required fields for project submission"
    )
    
    # Social Media & Contact
    contact_email = EmailField(
        help_text="Contact email for queries"
    )
    
    social_links = DictField(
        default=dict,
        help_text="Social media links"
    )
    # Example: {'twitter': 'url', 'linkedin': 'url'}
    
    hashtags = ListField(
        StringField(),
        default=list,
        help_text="Event hashtags"
    )
    
    # Status & Visibility
    status = StringField(
        required=True,
        choices=['draft', 'published', 'registration_open', 'registration_closed', 
                 'ongoing', 'judging', 'completed', 'cancelled'],
        default='draft',
        help_text="Current status of hackathon"
    )
    
    is_published = BooleanField(
        default=False,
        help_text="Whether hackathon is visible to public"
    )
    
    is_featured = BooleanField(
        default=False,
        help_text="Featured on homepage"
    )
    
    # Statistics
    view_count = IntField(
        default=0,
        help_text="Number of views"
    )
    
    registration_count = IntField(
        default=0,
        help_text="Number of registrations"
    )
    
    submission_count = IntField(
        default=0,
        help_text="Number of project submissions"
    )
    
    # Notifications
    send_reminders = BooleanField(
        default=True,
        help_text="Send email reminders to participants"
    )
    
    # Timestamps
    created_at = DateTimeField(
        default=datetime.utcnow
    )
    
    updated_at = DateTimeField(
        default=datetime.utcnow
    )
    
    published_at = DateTimeField(
        help_text="When hackathon was published"
    )
    
    # Methods
    
    def save(self, *args, **kwargs):
        """Override save to update timestamp"""
        self.updated_at = datetime.utcnow()
        
        # Auto-update registration count
        self.registration_count = len(self.participants)
        
        # Calculate total prize pool
        if self.prizes:
            self.total_prize_pool = sum([p.amount or 0 for p in self.prizes])
        
        return super(Hackathon, self).save(*args, **kwargs)
    
    def is_organizer(self, user):
        """Check if user is an organizer"""
        return (user == self.created_by or 
                user in self.organizers or 
                (self.organization and self.organization.is_admin(user)))
    
    def is_registered(self, user):
        """Check if user is registered"""
        return user in self.participants
    
    def is_judge(self, user):
        """Check if user is a judge"""
        return user in self.judges
    
    def can_register(self):
        """Check if registration is open"""
        now = datetime.utcnow()
        
        # Check if registration period is valid
        if self.registration_deadline and now > self.registration_deadline:
            return False, "Registration deadline has passed"
        
        if self.registration_start and now < self.registration_start:
            return False, "Registration has not started yet"
        
        # Check participant limit
        if self.max_participants and len(self.participants) >= self.max_participants:
            return False, "Maximum participants reached"
        
        # Check status
        if self.status not in ['published', 'registration_open']:
            return False, "Registration is not open"
        
        return True, "Registration is open"
    
    def register_participant(self, user):
        """Register a participant"""
        can_reg, message = self.can_register()
        
        if not can_reg:
            return False, message
        
        if self.is_registered(user):
            return False, "Already registered"
        
        if self.require_approval:
            if user not in self.pending_participants:
                self.pending_participants.append(user)
                self.save()
                return True, "Registration submitted for approval"
            return False, "Registration already pending"
        else:
            self.participants.append(user)
            self.save()
            return True, "Registration successful"
    
    def approve_participant(self, user):
        """Approve a pending participant"""
        if user in self.pending_participants:
            self.pending_participants.remove(user)
            self.participants.append(user)
            self.save()
            return True
        return False
    
    def unregister_participant(self, user):
        """Unregister a participant"""
        if user in self.participants:
            self.participants.remove(user)
            self.save()
            return True, "Unregistered successfully"
        return False, "Not registered"
    
    def add_team(self, team):
        """Add a team to hackathon"""
        if team not in self.teams:
            self.teams.append(team)
            self.save()
            return True
        return False
    
    def publish(self):
        """Publish the hackathon"""
        self.is_published = True
        self.status = 'registration_open'
        self.published_at = datetime.utcnow()
        self.save()
    
    def increment_views(self):
        """Increment view count"""
        self.view_count += 1
        self.save()
    
    def get_status_display(self):
        """Get human-readable status"""
        now = datetime.utcnow()
        
        if self.status == 'completed':
            return 'Completed'
        elif self.status == 'cancelled':
            return 'Cancelled'
        elif now < self.start_date:
            return 'Upcoming'
        elif now >= self.start_date and now <= self.end_date:
            return 'Ongoing'
        elif now > self.end_date:
            return 'Ended'
        else:
            return self.status.replace('_', ' ').title()
    
    def __str__(self):
        return f"Hackathon: {self.name}"
    
    def to_json(self, include_private=False):
        """Convert to JSON-friendly dictionary"""
        data = {
            'id': str(self.id),
            'name': self.name,
            'slug': self.slug,
            'tagline': self.tagline,
            'description': self.description,
            'theme': self.theme,
            'logo_url': self.logo_url,
            'banner_url': self.banner_url,
            'images': self.images,
            
            # Organization
            'organization': {
                'id': str(self.organization.id),
                'name': self.organization.name,
                'logo_url': self.organization.logo_url
            } if self.organization else None,
            
            # Dates
            'registration_start': self.registration_start.isoformat() if self.registration_start else None,
            'registration_deadline': self.registration_deadline.isoformat() if self.registration_deadline else None,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'submission_deadline': self.submission_deadline.isoformat() if self.submission_deadline else None,
            'result_date': self.result_date.isoformat() if self.result_date else None,
            
            # Location
            'mode': self.mode,
            'venue_name': self.venue_name,
            'venue_address': self.venue_address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'event_url': self.event_url,
            'discord_url': self.discord_url,
            'slack_url': self.slack_url,
            
            # Participation
            'max_participants': self.max_participants,
            'min_team_size': self.min_team_size,
            'max_team_size': self.max_team_size,
            'allow_team_formation': self.allow_team_formation,
            'require_approval': self.require_approval,
            'eligible_regions': self.eligible_regions,
            'min_age': self.min_age,
            'eligibility_criteria': self.eligibility_criteria,
            
            # Prizes
            'prizes': [p.to_json() for p in self.prizes],
            'total_prize_pool': self.total_prize_pool,
            'prize_currency': self.prize_currency,
            
            # Sponsors
            'sponsors': [s.to_json() for s in self.sponsors],
            
            # Tracks
            'tracks': [t.to_json() for t in self.tracks],
            
            # Schedule
            'schedule': [s.to_json() for s in self.schedule],
            
            # FAQs
            'faqs': [f.to_json() for f in self.faqs],
            
            # Rules
            'rules': self.rules,
            'code_of_conduct': self.code_of_conduct,
            'submission_guidelines': self.submission_guidelines,
            
            # Contact
            'contact_email': self.contact_email,
            'social_links': self.social_links,
            'hashtags': self.hashtags,
            
            # Status
            'status': self.status,
            'status_display': self.get_status_display(),
            'is_published': self.is_published,
            'is_featured': self.is_featured,
            
            # Stats
            'view_count': self.view_count,
            'registration_count': self.registration_count,
            'submission_count': self.submission_count,
            
            # Timestamps
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'published_at': self.published_at.isoformat() if self.published_at else None,
        }
        
        # Include private data only if requested (for organizers)
        if include_private:
            data.update({
                'participants': [str(p.id) for p in self.participants],
                'pending_participants': [str(p.id) for p in self.pending_participants],
                'teams': [str(t.id) for t in self.teams],
                'judges': [str(j.id) for j in self.judges],
                'judging_criteria': [c.to_json() for c in self.judging_criteria],
            })
        
        return data