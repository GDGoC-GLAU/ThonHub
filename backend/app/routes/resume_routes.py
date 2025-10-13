"""
Resume Upload Routes
Author: Akshit
Date: October 13, 2025
"""

from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from services.resume_analyzer import ResumeAnalyzer

resume_bp = Blueprint('resume', __name__)
UPLOAD_FOLDER = 'backend/uploads'
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@resume_bp.route('/upload', methods=['POST'])
def upload_resume():
    """Upload and analyze resume"""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        # Analyze resume
        analyzer = ResumeAnalyzer()
        analysis = analyzer.analyze_file(filepath)
        
        return jsonify({
            'success': True,
            'filename': filename,
            'analysis': analysis
        }), 200
    
    return jsonify({'error': 'Invalid file type'}), 400

@resume_bp.route('/analyze', methods=['POST'])
def analyze_resume():
    """Analyze resume text"""
    data = request.json
    text = data.get('text', '')
    
    analyzer = ResumeAnalyzer()
    analysis = analyzer.analyze_text(text)
    
    return jsonify({
        'success': True,
        'analysis': analysis
    }), 200
