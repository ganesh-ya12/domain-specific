from flask import Blueprint, jsonify, make_response, redirect, request, url_for
from flask_dance.contrib.google import make_google_blueprint, google
from flask_dance.contrib.github import make_github_blueprint, github
import bcrypt
import jwt
import os
import datetime
from app.database import mongo
from app.middleware.userMiddleware import token_required

user_bp = Blueprint('user', __name__)


# Google OAuth Blueprint
google_bp = make_google_blueprint(client_id=os.getenv('GOOGLE_CLIENT_ID'),
                                  client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
                                  redirect_to='google.callback')

# GitHub OAuth Blueprint
github_bp = make_github_blueprint(client_id=os.getenv('GITHUB_CLIENT_ID'),
                                  client_secret=os.getenv('GITHUB_CLIENT_SECRET'),
                                  redirect_to='user.github_login')

# # Register blueprints for Google and GitHub
# user_bp.register_blueprint(google_bp, url_prefix='/google_login')
# user_bp.register_blueprint(github_bp, url_prefix='/github_login')

def hash_password(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def get_jwt_secret():
    secret = os.getenv('JWT_SECRET')
    if secret is None:
        raise RuntimeError("JWT_SECRET environment variable is not set.")
    return secret
# Google OAuth Callback Route
# @google_bp.route('/callback')
# def google_callback():
#     if not google.authorized:
#         return redirect(url_for('google.login'))

#     # Get user info
#     google_user = google.get('/plus/v1/people/me')
#     user_info = google_user.json()
    
#     # Check if user exists in the database, or create a new user
#     user = mongo.db.users.find_one({"email": user_info['emails'][0]['value']})
#     if not user:
#         # Create a new user if not found
#         user_data = {
#             'username': user_info['displayName'],
#             'email': user_info['emails'][0]['value'],
#             'created_at': datetime.datetime.utcnow(),
#             'access_level': 'user'  # Default value
#         }
#         mongo.db.users.insert_one(user_data)
    
#     # Create JWT token for the user
#     payload = {
#         "username": user_info['displayName'],
#         "email": user_info['emails'][0]['value'],
#         'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
#     }
#     token = jwt.encode(payload, get_jwt_secret(), algorithm='HS256')
    
#     # Return JWT token as a cookie
#     response = make_response(jsonify({'message': "Login successful", "token": token}))
#     response.set_cookie('access_token', token, httponly=True, secure=True, samesite='None')
#     return response
@user_bp.route('/callback', methods=["POST"])
def google_signup():
    data = request.get_json()
    print(type(data['googleId']))
    print(f"Google Signup request data: {data}")
    
    try:
        # Check if user already exists
        existing_user = mongo.db.users.find_one({"email": data['email']})
        if existing_user:
            return jsonify({"message": "User already exists"}), 400
        
        # Create a new user with Google signup data
        user_data = {
            'email': data['email'],
            'username': data['username'],
            'google_id': str(data.get('googleId')),  # Store Google's unique user ID
            'created_at': datetime.datetime.utcnow(),
            'access_level': 'user',  # Default access level
            'signup_method': 'google'
        }
        
        # Insert the new user
        new_user = mongo.db.users.insert_one(user_data)

        # Create JWT token for the user
        payload = {
            "username": user_data['username'],
            "email": user_data['email'],
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=30)
        }

        token = jwt.encode(payload, key=get_jwt_secret(), algorithm='HS256')
        
        # Prepare response
        response = make_response(jsonify({
            'message': "User created successfully", 
            "token": token, 
            "username": user_data["username"]
        }))
        response.status_code = 201
        response.set_cookie('access_token', token, httponly=True, secure=True, samesite='None')
        
        return response
    
    except Exception as e:
        print(f"Error in Google signup: {str(e)}")
        return jsonify({"message": f"Error creating user: {str(e)}"}), 500
# GitHub OAuth Callback Route
@user_bp.route('/github/callback')
def github_callback():
    if not github.authorized:
        return redirect(url_for('github.login'))

    # Get user info
    github_user = github.get('/user')
    user_info = github_user.json()

    # Check if user exists in the database, or create a new user
    user = mongo.db.users.find_one({"email": user_info['email']})
    if not user:
        # Create a new user if not found
        user_data = {
            'username': user_info['login'],
            'email': user_info['email'],
            'created_at': datetime.datetime.utcnow(),
            'access_level': 'user'  # Default value
        }
        mongo.db.users.insert_one(user_data)
    
    # Create JWT token for the user
    payload = {
        "username": user_info['login'],
        "email": user_info['email'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
    }
    token = jwt.encode(payload, get_jwt_secret(), algorithm='HS256')
    
    # Return JWT token as a cookie
    response = make_response(jsonify({'message': "Login successful", "token": token}))
    response.set_cookie('access_token', token, httponly=True, secure=True, samesite='None')
    return response
@user_bp.route('/signup', methods=["POST"])
def signup():
    data = request.get_json()
    print(f"Signup request data: {request.get_json()}")
    if mongo.db.users.find_one({"email": data['email']}):
        return jsonify({"message": "User exists with given email"}), 400
    if data['password'] != data['confirmPass']:
        return jsonify({"message": "Passwords don't match"}), 400
    
    try:
        data['password'] = hash_password(data['password'])
        data['created_at'] = datetime.datetime.utcnow()
        data['access_level'] = 'user'  # Default value
        data.pop('confirmPass')
        new_user = mongo.db.users.insert_one(data)

        payload = {
            "username": data['username'],
            "email": data['email'],
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=30)
        }

        token = jwt.encode(payload, key=get_jwt_secret(), algorithm='HS256')
        response = make_response(jsonify({'message': "User created successfully", "token": token, "username": data["username"]}))
        response.status_code = 201
        response.set_cookie('access_token', token, httponly=True, secure=True, samesite='None')
        return response
    except Exception as e:
        return jsonify({"message": f"Error creating user: {str(e)}"}), 500


@user_bp.route('/login', methods=['POST','OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        # Handle preflight request for CORS
        response = jsonify({"message": "CORS preflight"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response

    data = request.get_json()
    user = mongo.db.users.find_one({"email": data['email']})
    if not user:
        return jsonify({'message': "Username or email doesn't exist"}), 400
    if not bcrypt.checkpw(data['password'].encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({"message": "Incorrect password, please try again"}), 400

    payload = {
        "username": user['username'],
        "email": user['email'],
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=30)
    }
    
    token = jwt.encode(payload, get_jwt_secret(), algorithm='HS256')
    response = make_response(jsonify({'message': "User logged in successfully", "token": token}))
    response.status_code = 200
    response.set_cookie('access_token', token, httponly=True, secure=True, samesite='None')
    
    return response

@user_bp.route('/logout', methods=['GET'])
def logout():
    response = make_response(jsonify({"message": "Logged out successfully"}))
    response.set_cookie('access_token', '', expires=0)
    return response

@user_bp.route('/preferences', methods=["POST"])
@token_required
def set_preferences():
    token = request.cookies.get('access_token')
    if not token:
        return jsonify({"message": "User not found"}), 400
    decoded_user = jwt.decode(token, get_jwt_secret(), algorithms=['HS256'])

    data = request.get_json()
    preferences = {
        "industry": data.get("industry"),
        "language": data.get("language"),
        "llm_experience": data.get("llm_experience"),
        "rag_experience": data.get("rag_experience")
    }

    mongo.db.users.update_one(
        {"username": decoded_user['username']},
        {"$set": {"preferences": preferences}}
    )
    
    return jsonify({"message": "Preferences saved successfully"}), 200


@user_bp.route('/find', methods=['GET'])
@token_required
def find():
    token = request.cookies.get('access_token')
    if not token:
        return jsonify({"message": "User not found"}), 400
    try:
        decoded_user = jwt.decode(token, get_jwt_secret(), algorithms=['HS256'])
        user = mongo.db.users.find_one({"username": decoded_user['username']})
        if user is None:
            return jsonify({"message": "User not found"}), 404
        return jsonify({"username": user['username'], 'email': user["email"], 'preferences': user.get("preferences", {})})
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401
