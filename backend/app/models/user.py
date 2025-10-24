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
    FileField,
    DictField
)
from werkzeug.security import generate_password_hash, check_password_hash
import secrets


# EMBEDDED DOCUMENTS
# These are like sub-objects that live inside the main User document

class SocialLinks(EmbeddedDocument):
    """
    User's social media profiles
    Yeah, we could just use a dict, but this gives us better validation
    """
    github = URLField()
    linkedin = URLField()
    twitter = URLField()
    portfolio = URLField()
    devpost = URLField()
    behance = URLField()
    dribbble = URLField()
    
    def to_json(self):
        return {
            'github': self.github,
            'linkedin': self.linkedin,
            'twitter': self.twitter,
            'portfolio': self.portfolio,
            'devpost': self.devpost,
            'behance': self.behance,
            'dribbble': self.dribbble
        }


class Education(EmbeddedDocument):
    """Single education entry - school, degree, dates, etc."""
    
    institution = StringField(required=True, max_length=200)
    degree = StringField(max_length=100)  # "Bachelor's in CS", "High School", etc.
    field_of_study = StringField(max_length=100)
    start_date = DateTimeField()
    end_date = DateTimeField()  # can be null if currently studying
    is_current = BooleanField(default=False)
    grade = StringField(max_length=20)  # "3.8 GPA" or "First Class" or whatever
    description = StringField(max_length=1000)
    
    def to_json(self):
        return {
            'institution': self.institution,
            'degree': self.degree,
            'field_of_study': self.field_of_study,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'is_current': self.is_current,
            'grade': self.grade,
            'description': self.description
        }


class Experience(EmbeddedDocument):
    """Work experience - internships, jobs, freelance, whatever"""
    
    company = StringField(required=True, max_length=200)
    position = StringField(required=True, max_length=100)
    location = StringField(max_length=100)
    start_date = DateTimeField(required=True)
    end_date = DateTimeField()  # null if currently working
    is_current = BooleanField(default=False)
    description = StringField(max_length=2000)  # what did you actually do?
    technologies = ListField(StringField(), default=list)  # tech stack used
    
    def to_json(self):
        return {
            'company': self.company,
            'position': self.position,
            'location': self.location,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'is_current': self.is_current,
            'description': self.description,
            'technologies': self.technologies
        }


class Project(EmbeddedDocument):
    """Personal projects - side projects, hackathon wins, cool stuff you built"""
    
    name = StringField(required=True, max_length=200)
    description = StringField(max_length=2000)
    role = StringField(max_length=100)  # "Full Stack Dev", "Team Lead", etc.
    technologies = ListField(StringField(), default=list)
    github_url = URLField()
    demo_url = URLField()
    image_url = URLField()
    start_date = DateTimeField()
    end_date = DateTimeField()
    # if this was from a hackathon, we can link it
    hackathon_id = StringField()  # we'll store the hackathon ID as string
    
    def to_json(self):
        return {
            'name': self.name,
            'description': self.description,
            'role': self.role,
            'technologies': self.technologies,
            'github_url': self.github_url,
            'demo_url': self.demo_url,
            'image_url': self.image_url,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'hackathon_id': self.hackathon_id
        }


class Badge(EmbeddedDocument):
    """
    Achievements and badges
    Like "First Hackathon", "5 Wins", "Team Player", etc.
    """
    
    name = StringField(required=True)
    description = StringField(max_length=500)
    icon = StringField()  # emoji or icon name
    category = StringField(
        choices=['achievement', 'participation', 'skill', 'special'],
        default='achievement'
    )
    earned_at = DateTimeField(default=datetime.utcnow)
    # some metadata about how they got it
    metadata = DictField(default=dict)  # like {"hackathon_id": "xyz", "wins": 5}
    
    def to_json(self):
        return {
            'name': self.name,
            'description': self.description,
            'icon': self.icon,
            'category': self.category,
            'earned_at': self.earned_at.isoformat() if self.earned_at else None,
            'metadata': self.metadata
        }


class HackathonParticipation(EmbeddedDocument):
    """
    Track each hackathon a user participated in
    This is separate from just storing hackathon refs because we want to track outcomes
    """
    
    hackathon_id = StringField(required=True)
    hackathon_name = StringField()  # denormalized for quick access
    role = StringField(
        choices=['participant', 'organizer', 'judge', 'mentor'],
        default='participant'
    )
    team_id = StringField()
    project_name = StringField()
    award = StringField()  # "1st Place", "Best Use of AI", etc. - null if no award
    participated_at = DateTimeField(default=datetime.utcnow)
    
    def to_json(self):
        return {
            'hackathon_id': self.hackathon_id,
            'hackathon_name': self.hackathon_name,
            'role': self.role,
            'team_id': self.team_id,
            'project_name': self.project_name,
            'award': self.award,
            'participated_at': self.participated_at.isoformat() if self.participated_at else None
        }


# MAIN USER MODEL

class User(Document):
    """
    The main User model - this is where all the magic happens!
    
    Stores everything about a user - from basic auth stuff to their entire profile,
    resume, hackathon history, badges, and more.
    """
    
    # tell mongo what collection to use
    meta = {
        'collection': 'users',
        'indexes': [
            'email',  # we'll search by email a lot
            'username',  # and username
            'is_active',
            'role',
            'created_at'
        ]
    }
    
    # AUTHENTICATION STUFF
    # Basic auth fields - email, password, etc.
    
    email = EmailField(
        required=True,
        unique=True,  # no duplicate emails
        help_text="User's email - used for login"
    )
    
    username = StringField(
        required=True,
        unique=True,
        min_length=3,
        max_length=30,
        help_text="Unique username - shown publicly"
    )
    
    # we store hashed passwords, NEVER plain text!
    password_hash = StringField(required=True)
    
    # for email verification
    email_verified = BooleanField(default=False)
    verification_token = StringField()
    
    # password reset stuff
    reset_token = StringField()
    reset_token_expires = DateTimeField()
    
    # BASIC PROFILE INFO
    
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    
    # profile picture
    avatar_url = URLField()
    # some users might want a custom banner on their profile
    banner_url = URLField()
    
    bio = StringField(
        max_length=500,
        help_text="Short bio - tell people about yourself!"
    )
    
    tagline = StringField(
        max_length=100,
        help_text="One-liner - like 'Full Stack Dev | AI Enthusiast'"
    )
    
    # LOCATION & CONTACT
    
    country = StringField(max_length=100)
    city = StringField(max_length=100)
    timezone = StringField(default='UTC')  # helps with scheduling
    
    phone = StringField(max_length=20)
    
    # PROFESSIONAL INFO
    
    # current status - student, professional, etc.
    current_status = StringField(
        choices=['student', 'professional', 'freelancer', 'between_jobs', 'other'],
        default='student'
    )
    
    current_company = StringField(max_length=200)
    current_position = StringField(max_length=100)
    
    # years of experience in tech
    years_of_experience = IntField(default=0)
    
    # SKILLS & INTERESTS
    
    # programming languages, frameworks, tools, etc.
    skills = ListField(StringField(), default=list)
    # what they're interested in - AI, Web3, IoT, etc.
    interests = ListField(StringField(), default=list)
    # what they're looking to learn
    learning = ListField(StringField(), default=list)
    
    # SOCIAL LINKS
    
    social_links = EmbeddedDocumentField(SocialLinks, default=SocialLinks)
    
    # EDUCATION & EXPERIENCE
    
    education = ListField(EmbeddedDocumentField(Education), default=list)
    experience = ListField(EmbeddedDocumentField(Experience), default=list)
    projects = ListField(EmbeddedDocumentField(Project), default=list)
    
    # RESUME/CV
    
    # if they upload a PDF resume
    resume_url = URLField()
    resume_uploaded_at = DateTimeField()
    
    # ===== HACKATHON STUFF =====
    
    # all hackathons they participated in
    hackathon_participation = ListField(
        EmbeddedDocumentField(HackathonParticipation),
        default=list
    )
    
    # badges and achievements
    badges = ListField(EmbeddedDocumentField(Badge), default=list)
    
    # simple counters for quick stats
    hackathons_participated = IntField(default=0)
    hackathons_won = IntField(default=0)
    hackathons_organized = IntField(default=0)
    
    # PREFERENCES & SETTINGS
    
    # notification preferences
    email_notifications = BooleanField(default=True)
    marketing_emails = BooleanField(default=False)
    
    # privacy settings
    profile_visibility = StringField(
        choices=['public', 'private', 'connections_only'],
        default='public'
    )
    
    show_email = BooleanField(default=False)  # show email on public profile?
    show_resume = BooleanField(default=True)
    
    # USER ROLE & STATUS
    
    role = StringField(
        choices=['user', 'organizer', 'admin', 'judge', 'mentor'],
        default='user'
    )
    
    is_active = BooleanField(default=True)
    is_banned = BooleanField(default=False)
    ban_reason = StringField()
    
    # GAMIFICATION
    
    # experience points - earn by participating, winning, helping others
    xp = IntField(default=0)
    level = IntField(default=1)
    
    # reputation score
    reputation = IntField(default=0)
    
    # METADATA
    
    # when they last logged in
    last_login = DateTimeField()
    last_active = DateTimeField()
    
    # account creation date
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    # referral tracking - who invited them?
    referred_by = StringField()
    referral_code = StringField(unique=True)  # their unique referral code
    
    # CUSTOM METHODS
    
    def save(self, *args, **kwargs):
        """Override save to update timestamp and calculate level"""
        self.updated_at = datetime.utcnow()
        
        # auto-calculate level from XP (every 100 XP = 1 level)
        self.level = (self.xp // 100) + 1
        
        # generate referral code if doesn't exist
        if not self.referral_code:
            self.referral_code = self.generate_referral_code()
        
        return super(User, self).save(*args, **kwargs)
    
    def set_password(self, password):
        """Hash and set password - never store plain text!"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Verify password against hash"""
        return check_password_hash(self.password_hash, password)
    
    def generate_verification_token(self):
        """Create a token for email verification"""
        self.verification_token = secrets.token_urlsafe(32)
        self.save()
        return self.verification_token
    
    def verify_email(self, token):
        """Verify email with token"""
        if self.verification_token == token:
            self.email_verified = True
            self.verification_token = None  # clear the token
            self.save()
            return True
        return False
    
    def generate_reset_token(self):
        """Generate password reset token (expires in 1 hour)"""
        from datetime import timedelta
        self.reset_token = secrets.token_urlsafe(32)
        self.reset_token_expires = datetime.utcnow() + timedelta(hours=1)
        self.save()
        return self.reset_token
    
    def reset_password(self, token, new_password):
        """Reset password with valid token"""
        if not self.reset_token or not self.reset_token_expires:
            return False, "No reset token found"
        
        if datetime.utcnow() > self.reset_token_expires:
            return False, "Reset token expired"
        
        if self.reset_token != token:
            return False, "Invalid token"
        
        # all good, reset the password
        self.set_password(new_password)
        self.reset_token = None
        self.reset_token_expires = None
        self.save()
        return True, "Password reset successful"
    
    def add_xp(self, amount, reason=""):
        """Add XP and return if leveled up"""
        old_level = self.level
        self.xp += amount
        self.save()  # this will auto-calculate new level
        
        leveled_up = self.level > old_level
        return leveled_up, self.level
    
    def award_badge(self, name, description, icon="🏆", category="achievement", metadata=None):
        """Give user a badge - yay achievements!"""
        # check if they already have this badge
        existing = [b for b in self.badges if b.name == name]
        if existing:
            return False, "Badge already earned"
        
        badge = Badge(
            name=name,
            description=description,
            icon=icon,
            category=category,
            metadata=metadata or {}
        )
        
        self.badges.append(badge)
        self.save()
        return True, badge
    
    def add_hackathon_participation(self, hackathon_id, hackathon_name, role='participant', 
                                   team_id=None, project_name=None, award=None):
        """Record hackathon participation"""
        participation = HackathonParticipation(
            hackathon_id=hackathon_id,
            hackathon_name=hackathon_name,
            role=role,
            team_id=team_id,
            project_name=project_name,
            award=award
        )
        
        self.hackathon_participation.append(participation)
        
        # update counters
        if role == 'participant':
            self.hackathons_participated += 1
            # award some XP for participating
            self.add_xp(50, f"Participated in {hackathon_name}")
        
        if award:
            self.hackathons_won += 1
            # more XP for winning!
            self.add_xp(200, f"Won award in {hackathon_name}")
        
        if role == 'organizer':
            self.hackathons_organized += 1
        
        self.save()
        
        # maybe award a badge for first hackathon?
        if self.hackathons_participated == 1:
            self.award_badge(
                "First Hackathon",
                "Participated in your first hackathon!",
                "🚀",
                "participation"
            )
    
    def add_education(self, institution, degree, **kwargs):
        """Add education entry"""
        edu = Education(
            institution=institution,
            degree=degree,
            **kwargs
        )
        self.education.append(edu)
        self.save()
        return edu
    
    def add_experience(self, company, position, start_date, **kwargs):
        """Add work experience"""
        exp = Experience(
            company=company,
            position=position,
            start_date=start_date,
            **kwargs
        )
        self.experience.append(exp)
        self.save()
        return exp
    
    def add_project(self, name, description, **kwargs):
        """Add a project to portfolio"""
        project = Project(
            name=name,
            description=description,
            **kwargs
        )
        self.projects.append(project)
        self.save()
        return project
    
    @staticmethod
    def generate_referral_code():
        """Generate unique 8-character referral code"""
        return secrets.token_urlsafe(6).upper()[:8]
    
    def get_full_name(self):
        """Return full name or username if name not set"""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        elif self.first_name:
            return self.first_name
        return self.username
    
    def update_last_login(self):
        """Update last login timestamp"""
        self.last_login = datetime.utcnow()
        self.last_active = datetime.utcnow()
        self.save()
    
    def is_admin(self):
        """Check if user is admin"""
        return self.role == 'admin'
    
    def can_organize(self):
        """Check if user can organize hackathons"""
        return self.role in ['organizer', 'admin']
    
    def get_stats(self):
        """Get user statistics for profile"""
        return {
            'hackathons_participated': self.hackathons_participated,
            'hackathons_won': self.hackathons_won,
            'hackathons_organized': self.hackathons_organized,
            'badges_count': len(self.badges),
            'xp': self.xp,
            'level': self.level,
            'reputation': self.reputation,
            'projects_count': len(self.projects)
        }
    
    def __str__(self):
        return f"User: {self.username} ({self.email})"
    
    def to_json(self, include_private=False):
        """
        Convert to JSON
        include_private: whether to include sensitive info (only for the user themselves)
        """
        data = {
            'id': str(self.id),
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'full_name': self.get_full_name(),
            'avatar_url': self.avatar_url,
            'banner_url': self.banner_url,
            'bio': self.bio,
            'tagline': self.tagline,
            'country': self.country,
            'city': self.city,
            'current_status': self.current_status,
            'current_company': self.current_company,
            'current_position': self.current_position,
            'years_of_experience': self.years_of_experience,
            'skills': self.skills,
            'interests': self.interests,
            'learning': self.learning,
            'social_links': self.social_links.to_json() if self.social_links else {},
            'education': [e.to_json() for e in self.education],
            'experience': [e.to_json() for e in self.experience],
            'projects': [p.to_json() for p in self.projects],
            'badges': [b.to_json() for b in self.badges],
            'stats': self.get_stats(),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'role': self.role
        }
        
        # only show email if user wants it public or this is their own profile
        if self.show_email or include_private:
            data['email'] = self.email
        
        # only show resume if they want it public
        if self.show_resume or include_private:
            data['resume_url'] = self.resume_url
        
        # stuff only the user themselves should see
        if include_private:
            data.update({
                'email_verified': self.email_verified,
                'phone': self.phone,
                'timezone': self.timezone,
                'email_notifications': self.email_notifications,
                'marketing_emails': self.marketing_emails,
                'profile_visibility': self.profile_visibility,
                'hackathon_participation': [h.to_json() for h in self.hackathon_participation],
                'last_login': self.last_login.isoformat() if self.last_login else None,
                'referral_code': self.referral_code
            })
        
        return data