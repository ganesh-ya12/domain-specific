from flask import Blueprint, jsonify, request, current_app
import os
import traceback
import tempfile
import jwt
from io import BytesIO
from werkzeug.utils import secure_filename
from ..middleware.userMiddleware import token_required
from ..services.fileProcessor import FileProcessor
from ..services.vectorProcessor import VectorStoreManager

vector_bp = Blueprint('vector', __name__)

# Helper function to decode the user email from the JWT token
def get_user_email(token):
    try:
        return jwt.decode(token, key=os.getenv("JWT_SECRET"), algorithms='HS256')['email']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

@vector_bp.route('/create', methods=["POST"])
@token_required
def add_vectors():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    filename = secure_filename(file.filename)

    if not filename:
        return jsonify({"error": "No file selected"}), 400

    # Get user email from the token
    token = request.cookies.get('access_token')
    user_email = get_user_email(token)

    if not user_email:
        return jsonify({"error": "Invalid or missing token"}), 401
    print(user_email)
    updated_metadata = {"user_email": str(user_email)}
    file_type = os.path.splitext(filename)[1].lower()

    try:
        # Save the uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_type) as temp_file:
            file.save(temp_file.name)
            temp_file_path = temp_file.name

        # Process the file to generate document chunks
        file_processor = FileProcessor( file_path=temp_file_path)
        documents = file_processor.load_documents()
        chunks = file_processor.split_documents(useremail=user_email)

        # Add the chunks to the vector store
        current_app.vector_manager.add_documents(chunks)
        return jsonify({"message": "Vectors added successfully"}), 201

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Error creating vectors: {str(e)}"}), 500

    finally:
        # Ensure temporary file is deleted
        if 'temp_file_path' in locals() and os.path.exists(temp_file_path):
            os.remove(temp_file_path)

@vector_bp.route('/search', methods=['POST'])
@token_required
def search_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid request payload"}), 400

    query = data.get('query')
    top_k = data.get('top_k', 5)  # Default value is 5 if not specified

    # Get user email from the token
    token = request.cookies.get('access_token')
    user_email = get_user_email(token)

    if not query or not user_email:
        return jsonify({"error": "Query and user email are required"}), 400

    try:
        # Search the vector store
        results = current_app.vector_manager.search(query, user_email, top_k=top_k)

        formatted_results = [
    {"content": result.page_content, "score": score} for result,score in results
            ]
        return jsonify({"results": formatted_results}), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Error during search: {str(e)}"}), 500
