from flask import Flask
from backend.config import Config
from backend.extensions import db, jwt, cors

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    
    # Register blueprints
    from backend.routes.auth_routes import auth_bp
    from backend.routes.dashboard_routes import dashboard_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(dashboard_bp, url_prefix="/dashboard")

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
