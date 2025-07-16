from functools import wraps
from flask import request, jsonify, current_app
import jwt

def token_required(allowed_roles=None):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = None

            if 'Authorization' in request.headers:
                token = request.headers['Authorization'].split()[1]

            if not token:
                return jsonify({'message': 'Token missing'}), 401

            try:
                decoded = jwt.decode(
                    token,
                    current_app.config['SECRET_KEY'],
                    algorithms=['HS256']
                )
                if allowed_roles and decoded.get('user_type') not in allowed_roles:
                    return jsonify({'message': 'Access denied'}), 403

                request.user = decoded  # Store for access in route

            except jwt.ExpiredSignatureError:
                return jsonify({'message': 'Token expired'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'message': 'Invalid token'}), 401

            return f(*args, **kwargs)
        return wrapper
    return decorator
