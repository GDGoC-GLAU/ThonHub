"""
AI Resume Analyzer Service
Author: Akshit
Date: October 13, 2025
"""

import PyPDF2
import docx
import re
from collections import Counter

class ResumeAnalyzer:
    def __init__(self):
        self.tech_skills = [
            'Python', 'Java', 'JavaScript', 'React', 'Node.js', 
            'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes',
            'Machine Learning', 'Deep Learning', 'TensorFlow',
            'PyTorch', 'HTML', 'CSS', 'Git', 'REST API'
        ]
    
    def extract_text_from_pdf(self, filepath):
        """Extract text from PDF"""
        with open(filepath, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ''
            for page in reader.pages:
                text += page.extract_text()
        return text
    
    def extract_text_from_docx(self, filepath):
        """Extract text from DOCX"""
        doc = docx.Document(filepath)
        text = '\n'.join([para.text for para in doc.paragraphs])
        return text
    
    def extract_text_from_txt(self, filepath):
        """Extract text from TXT"""
        with open(filepath, 'r', encoding='utf-8') as file:
            return file.read()
    
    def analyze_file(self, filepath):
        """Analyze resume file"""
        ext = filepath.rsplit('.', 1)[1].lower()
        
        if ext == 'pdf':
            text = self.extract_text_from_pdf(filepath)
        elif ext == 'docx':
            text = self.extract_text_from_docx(filepath)
        else:
            text = self.extract_text_from_txt(filepath)
        
        return self.analyze_text(text)
    
    def analyze_text(self, text):
        """Analyze resume text with AI"""
        # Detect skills
        detected_skills = [skill for skill in self.tech_skills 
                          if skill.lower() in text.lower()]
        
        # Extract email
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, text)
        
        # Extract phone
        phone_pattern = r'[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}'
        phones = re.findall(phone_pattern, text)
        
        # Calculate score
        score = min(100, len(detected_skills) * 10 + 20)
        
        return {
            'skills': detected_skills,
            'email': emails[0] if emails else None,
            'phone': phones[0] if phones else None,
            'score': score,
            'word_count': len(text.split()),
            'experience_level': 'Mid-Level' if len(detected_skills) > 5 else 'Junior'
        }
