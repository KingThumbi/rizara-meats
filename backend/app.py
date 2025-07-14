import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Initialize app and db first
load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///rizara.db'
db = SQLAlchemy(app)

# Import routes after app and db are created
from backend.routes.auth_routes import auth_bp
from backend.routes.dashboard_routes import dashboard_bp

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(dashboard_bp, url_prefix='/dashboard')

if __name__ == '__main__':
    app.run(debug=True)