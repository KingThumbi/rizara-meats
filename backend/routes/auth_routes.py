# backend/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from backend.extensions import db
from backend.models.user import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    required_fields = ['name', 'email', 'password', 'phone', 'id_number', 'user_type']

    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 409

    hashed_pw = generate_password_hash(data['password'])

    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_pw,
        phone=data['phone'],
        id_number=data['id_number'],
        user_type=data['user_type']
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()

    if user and check_password_hash(user.password, data.get('password')):
        access_token = create_access_token(identity={
            'id': user.id,
            'email': user.email,
            'user_type': user.user_type
        })
        return jsonify(token=access_token, user_type=user.user_type)

    return jsonify({'error': 'Invalid credentials'}), 401