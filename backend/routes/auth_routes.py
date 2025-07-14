from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from app import db
from models.user import User

auth_bp = Blueprint('auth', __name__)

# 🔐 Replace with environment variable in production
SECRET_KEY = 'your-secret-key'


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = generate_password_hash(data['password'])

    new_user = User(
        email=data['email'],
        password=hashed_password,
        name=data.get('name'),
        phone=data.get('phone'),
        national_id=data.get('national_id'),
        user_type=data.get('user_type', 'customer')
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        'message': 'User registered successfully',
        'user_type': new_user.user_type
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    token = jwt.encode({
        'user_id': user.id,
        'email': user.email,
        'user_type': user.user_type,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=12)
    }, SECRET_KEY, algorithm='HS256')

    return jsonify({
        'token': token,
        'user_type': user.user_type
    }), 200
