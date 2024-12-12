from flask import Blueprint, jsonify, request,current_app
import os
import traceback,tempfile
import jwt
from io import BytesIO
from ..middleware.userMiddleware import token_required
from werkzeug.utils import secure_filename
from ..services.fileProcessor import FileProcessor
from ..services.vectorProcessor import VectorStoreManager

vector_bp=Blueprint('vector',__name__)

def getUser(token):
    return jwt.decode(token,key=os.getenv("JWT_SECRET"),algorithms='HS256')['email']

@vector_bp.route('/create',methods=["POST"])
@token_required
def add_vectors():
    if 'file' not in request.files:
        return jsonify({"error":"No Files"}) ,400
    file=request.files['file']
    filename=secure_filename(file.filename)
    token=request.cookies.get('access_token')
    useremail=getUser(token)
    updated_metadata={"useremail":useremail}
    file_type=os.path.splitext(filename)[1].lower()
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_type) as temp_file:
            file.save(temp_file.name)  # Save uploaded file to temp file
            temp_file_path = temp_file.name  # Get the path
        file_processor=FileProcessor(file_type=file_type,file_path=temp_file_path)
        documents=file_processor.load_documents()
        chunks=file_processor.split_documents(metadata_updates=updated_metadata)
        current_app.vector_manager.add_documents(chunks)
        return jsonify({"message":"Vector are added successfully"}),201

    except Exception as e:
        traceback.print_exc() 
        print(f"Error in creating vector storage: {str(e)}")
        return jsonify({"message": f"Error creating vectors: {str(e)}"}), 500
    finally: # Ensure deletion of temp file
        if 'temp_file_path' in locals() and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
@vector_bp.route('/search', methods=['POST'])
@token_required
def search_route():
    # Get the JSON data from the request
    data = request.get_json()
    token=request.cookies.get('access_token')
    # Extract the query and user_email from the request data
    query = data.get('query')
    user_email = getUser(token=token)
    top_k = data.get('top_k', 5)  # Default to 5 if not provided

    if not query or not user_email:
        return jsonify({"error": "Query and user_email are required"}), 400

    # Call the search method of the search service
    try:
        results = current_app.vector_manager.search(query, user_email)
        print(type(results))
        print(results)
        #return jsonify({"results": results.to_dict()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


