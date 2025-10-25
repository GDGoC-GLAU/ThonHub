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
    DictField,
    FileField
)
from .user import User


# ===== EMBEDDED DOCUMENTS =====

class TeamMember(EmbeddedDocument):
    """
    Individual team member info
    We use this instead of just storing User references because we need to track
    role, join date, contribution, etc.
    """
    
    user = ReferenceField(User, required=True)
    role = StringField(
        choices=['leader', 'member', 'pending'],
        default='member',
        help_text="Leader can manage team, pending means invitation not accepted yet"
    )
    
    # what's their role in the project? (different from team role)
    project_role = StringField(
        max_length=100,
        help_text="Like 'Frontend Dev', 'Designer', 'Project Manager', etc."
    )
    
    joined_at = DateTimeField(default=datetime.utcnow)
    
    # for internal tracking - did they actually contribute?
    contribution_level = StringField(
        choices=['high', 'medium', 'low', 'none'],
        default='medium',
        help_text="Team can rate each member's contribution"
    )
    
    # any notes about this member (visible to team only)
    notes = StringField(max_length=500)
    
    def to_json(self, include_details=True):
        """Convert to dict - include_details shows contribution info"""
        data = {
            'user_id': str(self.user.id),
            'username': self.user.username if self.user else 'Unknown',
            'avatar_url': self.user.avatar_url if self.user else None,
            'role': self.role,
            'project_role': self.project_role,
            'joined_at': self.joined_at.isoformat() if self.joined_at else None
        }
        
        if include_details:
            data.update({
                'contribution_level': self.contribution_level,
                'notes': self.notes
            })
        
        return data


class TeamInvitation(EmbeddedDocument):
    """
    Track pending invitations
    When someone invites a user to join the team
    """
    
    inviter = ReferenceField(User, required=True)  # who sent the invite
    invitee_email = EmailField(required=True)  # who's being invited
    invitee = ReferenceField(User)  # if they have an account, link it
    
    message = StringField(max_length=500)  # personal message with invite
    status = StringField(
        choices=['pending', 'accepted', 'declined', 'expired'],
        default='pending'
    )
    
    invited_at = DateTimeField(default=datetime.utcnow)
    responded_at = DateTimeField()
    
    # invites expire after some time (like 7 days)
    expires_at = DateTimeField()
    
    def to_json(self):
        return {
            'inviter': self.inviter.username if self.inviter else 'Unknown',
            'invitee_email': self.invitee_email,
            'invitee': self.invitee.username if self.invitee else None,
            'message': self.message,
            'status': self.status,
            'invited_at': self.invited_at.isoformat() if self.invited_at else None,
            'expires_at': self.expires_at.isoformat() if self.expires_at else None
        }


class ProjectSubmission(EmbeddedDocument):
    """
    The actual project submission
    This is what gets judged!
    """
    
    project_name = StringField(required=True, max_length=200)
    tagline = StringField(max_length=150, help_text="One-liner describing the project")
    
    description = StringField(help_text="Full project description - what does it do?")
    
    # problem it solves
    problem_statement = StringField(
        max_length=1000,
        help_text="What problem are you solving?"
    )
    
    # your solution
    solution = StringField(
        max_length=2000,
        help_text="How does your project solve it?"
    )
    
    # tech used
    technologies = ListField(
        StringField(),
        default=list,
        help_text="Tech stack - React, Python, MongoDB, etc."
    )
    
    # which track are you submitting to?
    track = StringField(help_text="AI/ML, Web3, Healthcare, etc.")
    
    # links to everything
    github_url = URLField()
    demo_url = URLField(help_text="Live demo link")
    video_url = URLField(help_text="Demo video (YouTube, Loom, etc.)")
    presentation_url = URLField(help_text="Pitch deck/slides")
    
    # screenshots/images
    images = ListField(URLField(), default=list)
    
    # additional files (maybe design files, documentation, etc.)
    # storing as URLs - in production you'd upload to S3 or similar
    files = ListField(DictField(), default=list)
    # each file: {"name": "design.fig", "url": "https://...", "type": "figma"}
    
    # submission status
    is_submitted = BooleanField(default=False)
    submitted_at = DateTimeField()
    
    # can make changes until submission deadline
    last_updated = DateTimeField(default=datetime.utcnow)
    
    def to_json(self):
        return {
            'project_name': self.project_name,
            'tagline': self.tagline,
            'description': self.description,
            'problem_statement': self.problem_statement,
            'solution': self.solution,
            'technologies': self.technologies,
            'track': self.track,
            'github_url': self.github_url,
            'demo_url': self.demo_url,
            'video_url': self.video_url,
            'presentation_url': self.presentation_url,
            'images': self.images,
            'files': self.files,
            'is_submitted': self.is_submitted,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None,
            'last_updated': self.last_updated.isoformat() if self.last_updated else None
        }


class TeamNote(EmbeddedDocument):
    """
    Internal team notes
    Like a mini chat/notepad for the team
    """
    
    author = ReferenceField(User, required=True)
    content = StringField(required=True, max_length=2000)
    
    # different types of notes
    note_type = StringField(
        choices=['general', 'todo', 'idea', 'bug', 'decision'],
        default='general'
    )
    
    # is this note important/pinned?
    is_pinned = BooleanField(default=False)
    
    # tags for organization
    tags = ListField(StringField(), default=list)
    
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    # notes can be marked as done (for todos)
    is_completed = BooleanField(default=False)
    completed_by = ReferenceField(User)
    completed_at = DateTimeField()
    
    def to_json(self):
        return {
            'id': str(id(self)),  # temporary ID for frontend
            'author': {
                'user_id': str(self.author.id),
                'username': self.author.username,
                'avatar_url': self.author.avatar_url
            } if self.author else None,
            'content': self.content,
            'note_type': self.note_type,
            'is_pinned': self.is_pinned,
            'tags': self.tags,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'is_completed': self.is_completed,
            'completed_by': self.completed_by.username if self.completed_by else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None
        }


class JudgeScore(EmbeddedDocument):
    """
    Score from a single judge
    Each judge rates the project on different criteria
    """
    
    judge = ReferenceField(User, required=True)
    
    # scores for different criteria (out of 10 usually)
    scores = DictField(default=dict)
    # example: {"innovation": 8, "design": 7, "functionality": 9, "impact": 8}
    
    total_score = FloatField(default=0.0)
    
    # judge's comments
    feedback = StringField(max_length=2000)
    
    # private notes (only for judges and organizers)
    private_notes = StringField(max_length=1000)
    
    scored_at = DateTimeField(default=datetime.utcnow)
    
    def calculate_total(self, weights=None):
        """
        Calculate total score
        weights: dict of criterion -> weight (if some criteria are more important)
        """
        if not self.scores:
            return 0.0
        
        if weights:
            total = sum(self.scores.get(criterion, 0) * weights.get(criterion, 1) 
                       for criterion in self.scores.keys())
            max_possible = sum(10 * weights.get(criterion, 1) 
                             for criterion in self.scores.keys())
            # normalize to 0-100 scale
            self.total_score = (total / max_possible) * 100 if max_possible > 0 else 0
        else:
            # simple average
            self.total_score = sum(self.scores.values()) / len(self.scores) if self.scores else 0
        
        return self.total_score
    
    def to_json(self, include_private=False):
        data = {
            'judge': self.judge.username if self.judge else 'Unknown',
            'scores': self.scores,
            'total_score': self.total_score,
            'feedback': self.feedback,
            'scored_at': self.scored_at.isoformat() if self.scored_at else None
        }
        
        if include_private:
            data['private_notes'] = self.private_notes
        
        return data


# ===== MAIN TEAM MODEL =====

class Team(Document):
    """
    The main Team model
    
    Represents a team participating in a hackathon
    Includes members, project details, submissions, notes, and everything else
    """
    
    meta = {
        'collection': 'teams',
        'indexes': [
            'hackathon',
            'team_name',
            'status',
            'created_at',
            'is_disqualified'
        ]
    }
    
    # ===== BASIC INFO =====
    
    team_name = StringField(
        required=True,
        max_length=100,
        help_text="Team name - make it cool!"
    )
    
    # slug for URLs - like "awesome-team"
    slug = StringField(unique=True)
    
    tagline = StringField(
        max_length=150,
        help_text="Short catchy description"
    )
    
    description = StringField(
        max_length=1000,
        help_text="About the team"
    )
    
    # team logo/avatar
    logo_url = URLField()
    
    # which hackathon is this for?
    # we import hackathon later to avoid circular import
    hackathon = ReferenceField('Hackathon', required=True)
    
    # ===== TEAM MEMBERS =====
    
    members = ListField(
        EmbeddedDocumentField(TeamMember),
        default=list,
        help_text="All team members including leader"
    )
    
    # track team leader separately for quick access
    leader = ReferenceField(
        User,
        required=True,
        help_text="Team leader - has admin rights"
    )
    
    # pending invitations
    invitations = ListField(
        EmbeddedDocumentField(TeamInvitation),
        default=list
    )
    
    # max team size (set from hackathon rules)
    max_size = IntField(default=4)
    
    # ===== PROJECT & SUBMISSION =====
    
    submission = EmbeddedDocumentField(
        ProjectSubmission,
        help_text="The project they're building/submitting"
    )
    
    # is the submission finalized?
    is_submitted = BooleanField(default=False)
    submission_date = DateTimeField()
    
    # ===== TEAM NOTES & COMMUNICATION =====
    
    notes = ListField(
        EmbeddedDocumentField(TeamNote),
        default=list,
        help_text="Internal team notes, todos, ideas"
    )
    
    # quick links the team wants to save
    bookmarks = ListField(DictField(), default=list)
    # example: [{"title": "API Docs", "url": "https://..."}, ...]
    
    # ===== STATUS & VISIBILITY =====
    
    status = StringField(
        choices=['forming', 'active', 'submitted', 'judging', 'completed', 'withdrawn'],
        default='forming',
        help_text="Current team status"
    )
    
    # is team looking for more members?
    is_recruiting = BooleanField(
        default=False,
        help_text="Show on 'Find a Team' page"
    )
    
    # skills they're looking for
    looking_for_skills = ListField(
        StringField(),
        default=list,
        help_text="Skills needed - 'Designer', 'Backend Dev', etc."
    )
    
    # is team profile public or private?
    is_public = BooleanField(
        default=True,
        help_text="Can others view team profile?"
    )
    
    # ===== JUDGING & RESULTS =====
    
    # scores from judges
    judge_scores = ListField(
        EmbeddedDocumentField(JudgeScore),
        default=list
    )
    
    # average score from all judges
    final_score = FloatField(default=0.0)
    
    # did they win anything?
    awards = ListField(
        StringField(),
        default=list,
        help_text="Awards won - '1st Place', 'Best Design', etc."
    )
    
    # final rank in hackathon (1, 2, 3, etc.)
    rank = IntField()
    
    # organizers can leave feedback for the team
    organizer_feedback = StringField(max_length=2000)
    
    # ===== ADMIN STUFF =====
    
    # team can be disqualified for rule violations
    is_disqualified = BooleanField(default=False)
    disqualification_reason = StringField()
    
    # did they check in? (some hackathons require teams to check in)
    checked_in = BooleanField(default=False)
    check_in_time = DateTimeField()
    
    # table number at physical hackathons
    table_number = StringField(max_length=20)
    
    # ===== METADATA =====
    
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    # track engagement
    last_activity = DateTimeField(default=datetime.utcnow)
    
    # ===== CUSTOM METHODS =====
    
    def save(self, *args, **kwargs):
        """Auto-update timestamps and calculate scores"""
        self.updated_at = datetime.utcnow()
        
        # calculate final score from all judge scores
        if self.judge_scores:
            self.final_score = sum(s.total_score for s in self.judge_scores) / len(self.judge_scores)
        
        # generate slug if doesn't exist
        if not self.slug:
            from slugify import slugify
            base_slug = slugify(self.team_name)
            # make sure it's unique
            slug = base_slug
            counter = 1
            while Team.objects(slug=slug).first():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        
        return super(Team, self).save(*args, **kwargs)
    
    def add_member(self, user, role='member', project_role=''):
        """
        Add a member to the team
        Returns (success, message)
        """
        # check if team is full
        if len(self.members) >= self.max_size:
            return False, f"Team is full (max {self.max_size} members)"
        
        # check if user already in team
        if any(m.user == user for m in self.members):
            return False, "User is already a team member"
        
        # add the member
        member = TeamMember(
            user=user,
            role=role,
            project_role=project_role
        )
        self.members.append(member)
        self.last_activity = datetime.utcnow()
        self.save()
        
        return True, "Member added successfully"
    
    def remove_member(self, user):
        """Remove a member from team"""
        # can't remove the leader
        if user == self.leader:
            return False, "Cannot remove team leader. Transfer leadership first."
        
        # find and remove member
        self.members = [m for m in self.members if m.user != user]
        self.last_activity = datetime.utcnow()
        self.save()
        
        return True, "Member removed"
    
    def transfer_leadership(self, new_leader):
        """Transfer team leadership to another member"""
        # check if new leader is a member
        if not any(m.user == new_leader for m in self.members):
            return False, "New leader must be a team member"
        
        old_leader = self.leader
        
        # update roles in members list
        for member in self.members:
            if member.user == old_leader:
                member.role = 'member'
            elif member.user == new_leader:
                member.role = 'leader'
        
        self.leader = new_leader
        self.save()
        
        return True, f"Leadership transferred to {new_leader.username}"
    
    def send_invitation(self, inviter, invitee_email, message='', invitee_user=None):
        """
        Send team invitation
        inviter: User sending invite
        invitee_email: email to send to
        invitee_user: User object if they're already registered
        """
        from datetime import timedelta
        
        # check if team is full
        if len(self.members) >= self.max_size:
            return False, "Team is full"
        
        # check if already invited
        pending_invites = [inv for inv in self.invitations 
                          if inv.invitee_email == invitee_email and inv.status == 'pending']
        if pending_invites:
            return False, "Invitation already sent to this email"
        
        # check if already a member
        if invitee_user and any(m.user == invitee_user for m in self.members):
            return False, "User is already a team member"
        
        # create invitation
        invitation = TeamInvitation(
            inviter=inviter,
            invitee_email=invitee_email,
            invitee=invitee_user,
            message=message,
            expires_at=datetime.utcnow() + timedelta(days=7)  # expires in 7 days
        )
        
        self.invitations.append(invitation)
        self.save()
        
        # TODO: send email notification
        
        return True, "Invitation sent"
    
    def accept_invitation(self, user):
        """Accept a team invitation"""
        # find the invitation
        invitation = None
        for inv in self.invitations:
            if inv.invitee == user and inv.status == 'pending':
                invitation = inv
                break
        
        if not invitation:
            return False, "No pending invitation found"
        
        # check if expired
        if invitation.expires_at and datetime.utcnow() > invitation.expires_at:
            invitation.status = 'expired'
            self.save()
            return False, "Invitation has expired"
        
        # add user to team
        success, message = self.add_member(user, role='member')
        
        if success:
            invitation.status = 'accepted'
            invitation.responded_at = datetime.utcnow()
            self.save()
            return True, "Joined team successfully"
        else:
            return False, message
    
    def decline_invitation(self, user):
        """Decline a team invitation"""
        for inv in self.invitations:
            if inv.invitee == user and inv.status == 'pending':
                inv.status = 'declined'
                inv.responded_at = datetime.utcnow()
                self.save()
                return True, "Invitation declined"
        
        return False, "No pending invitation found"
    
    def add_note(self, author, content, note_type='general', tags=None, is_pinned=False):
        """Add a note to team board"""
        note = TeamNote(
            author=author,
            content=content,
            note_type=note_type,
            tags=tags or [],
            is_pinned=is_pinned
        )
        
        self.notes.append(note)
        self.last_activity = datetime.utcnow()
        self.save()
        
        return note
    
    def update_submission(self, **kwargs):
        """Update project submission"""
        if not self.submission:
            from .team import ProjectSubmission
            self.submission = ProjectSubmission()
        
        # update fields
        for key, value in kwargs.items():
            if hasattr(self.submission, key):
                setattr(self.submission, key, value)
        
        self.submission.last_updated = datetime.utcnow()
        self.last_activity = datetime.utcnow()
        self.save()
        
        return self.submission
    
    def submit_project(self):
        """
        Finalize project submission
        After this, no more changes allowed (usually)
        """
        if not self.submission:
            return False, "No project to submit"
        
        if not self.submission.project_name:
            return False, "Project name is required"
        
        if not self.submission.description:
            return False, "Project description is required"
        
        # mark as submitted
        self.submission.is_submitted = True
        self.submission.submitted_at = datetime.utcnow()
        self.is_submitted = True
        self.submission_date = datetime.utcnow()
        self.status = 'submitted'
        self.save()
        
        return True, "Project submitted successfully!"
    
    def add_judge_score(self, judge, scores, feedback='', private_notes='', weights=None):
        """
        Add a score from a judge
        scores: dict like {"innovation": 8, "design": 7}
        """
        # check if judge already scored this team
        existing = [s for s in self.judge_scores if s.judge == judge]
        if existing:
            # update existing score
            score = existing[0]
            score.scores = scores
            score.feedback = feedback
            score.private_notes = private_notes
            score.calculate_total(weights)
            score.scored_at = datetime.utcnow()
        else:
            # create new score
            score = JudgeScore(
                judge=judge,
                scores=scores,
                feedback=feedback,
                private_notes=private_notes
            )
            score.calculate_total(weights)
            self.judge_scores.append(score)
        
        self.save()
        return score
    
    def award_prize(self, award_name):
        """Give team an award"""
        if award_name not in self.awards:
            self.awards.append(award_name)
            self.save()
            return True
        return False
    
    def disqualify(self, reason):
        """Disqualify team from hackathon"""
        self.is_disqualified = True
        self.disqualification_reason = reason
        