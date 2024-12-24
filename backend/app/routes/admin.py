from flask import Blueprint, jsonify, make_response, redirect, request, url_for,g
import bcrypt
import jwt
import os
import datetime
from app.database import mongo
from app.middleware.adminMiddleware import token_required

admin_bp = Blueprint('admin', __name__)
@admin_bp.route('/users', methods=['GET'])
@token_required
def get_all_users():
    try:
        # Get all users but exclude sensitive information
        users = list(mongo.db.users.find({}, {
            'password': 0,  # Exclude password
            'tokens': 0     # Exclude tokens
        }))
        
        # Convert ObjectId to string for JSON serialization
        for user in users:
            user['_id'] = str(user['_id'])
            
            # Convert datetime objects to ISO format strings if they exist
            if 'created_at' in user:
                user['created_at'] = user['created_at'].isoformat()
            if 'last_active' in user:
                user['last_active'] = user['last_active'].isoformat()
        
        return jsonify({
            "message": "Users retrieved successfully",
            "count": len(users),
            "users": users
        })
        
    except Exception as e:
        return jsonify({
            "message": "Failed to retrieve users",
            "error": str(e)
        }), 500