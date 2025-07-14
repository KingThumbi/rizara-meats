from flask import Blueprint, request, jsonify
import jwt
import datetime
from werkzeug.security import check_password_hash
from models.user import User, db

auth_bp = Blueprint('auth', __name__)
SECRET_KEY = "rizara-secret"

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        token = jwt.encode(
            {"user_id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)},
            SECRET_KEY,
            algorithm="HS256"
        )
        return jsonify({"token": token})
    else:
        return jsonify({"message": "Invalid email or password"}), 401
