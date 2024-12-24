import jwt
from functools import wraps
from flask import jsonify, request, g
import os
from app.database import mongo

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Check for the token in the Authorization header
        if 'Authorization' in request.headers:
            auth_header = request.headers.get('Authorization')
            # Ensure the header follows the "Bearer <token>" format
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({"message": "Unauthorized access. Login to continue."}), 401
        
        try:
            # Decode the token using the secret key
            data = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms='HS256')
            username = data['username']
            current_user = mongo.db.users.find_one({"username": username})
            if not current_user:
                return jsonify({'error': 'Invalid token'}), 401
            
            g.user = current_user
            g.email=data['email']

        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired. Please login again.'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        return f(*args, **kwargs)
    return decorated
