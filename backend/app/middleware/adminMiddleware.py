import jwt
from functools import wraps
from flask import jsonify, request, g
import os
from app.database import mongo

def get_token_from_cookies():
    return request.cookies.get('access_token')

def decode_token(token):
    secret_key = os.getenv("JWT_SECRET", "default_secret_key")
    return jwt.decode(token, secret_key, algorithms='HS256')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_from_cookies()
        if not token:
            return jsonify({"message": "Unauthorized access: login to continue"}), 401
        try:
            data = decode_token(token)
            username = data.get('username')
            if not username:
                return jsonify({'error': 'Invalid token: username missing'}), 401 
            current_user = mongo.db.users.find_one({"username": username})
            if not current_user:
                return jsonify({'error': 'Invalid token: user not found'}), 401 
            
            if current_user.get('access_level') != 'admin':
                return jsonify({'error': 'Not authorized: admins only'}), 403 
            
            g.user = current_user 
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired: login again'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        
        return f(*args, **kwargs)
    
    return decorated
