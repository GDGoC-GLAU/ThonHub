from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from flask import Flask
from flask_cors import CORS
from routes.resume_routes import resume_bp

app = Flask(__name__)
CORS(app)

# Register resume blueprint
app.register_blueprint(resume_bp, url_prefix='/api/resume')

# ... rest of your existing code

def create_app():
    # Load environment variables
    load_dotenv()
    
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    app.config['MONGODB_URI'] = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/thonhub')
    
    # Enable CORS
    CORS(app, origins=os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(','))
    
    # Register blueprints (routes will be added later)
    # from .routes import auth, users, hackathons, chat, orgs, notifications
    # app.register_blueprint(auth.bp)
    # app.register_blueprint(users.bp)
    # app.register_blueprint(hackathons.bp)
    # app.register_blueprint(chat.bp)
    # app.register_blueprint(orgs.bp)
    # app.register_blueprint(notifications.bp)
    
    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'message': 'ThonHub API is running'}
    
    return app