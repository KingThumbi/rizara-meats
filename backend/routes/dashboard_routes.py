from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models.user import User

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user_info():
    identity = get_jwt_identity()
    user = User.query.filter_by(id=identity['id']).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'phone': user.phone,
        'id_number': user.id_number,
        'user_type': user.user_type
    })

