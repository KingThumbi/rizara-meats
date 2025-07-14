from functools import wraps
from flask import request, jsonify
import jwt

SECRET_KEY = 'your-secret-key'

def token_required(allowed_roles=None):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = None
            if 'Authorization' in request.headers:
                token = request.headers['Authorization'].split()[1]

            if not token:
                return jsonify({'message': 'Token is missing'}), 401

            try:
                data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
                if allowed_roles and data['user_type'] not in allowed_roles:
                    return jsonify({'message': 'Access denied'}), 403
                request.user = data
            except Exception as e:
                return jsonify({'message': 'Token is invalid'}), 401

            return f(*args, **kwargs)
        return wrapper
    return decorator
