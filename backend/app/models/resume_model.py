"""
Resume Database Model
Author: Akshit
"""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Resume(db.Model):
    """Resume model for database"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(500), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    analysis_score = db.Column(db.Integer)
    skills = db.Column(db.JSON)
    
    def __repr__(self):
        return f'<Resume {self.filename}>'
