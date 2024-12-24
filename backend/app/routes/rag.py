from flask import Blueprint,jsonify,request,current_app,g
from ..middleware.headerMiddleware import token_required
import jwt
import requests
import os 
from dotenv import load_dotenv
rag_bp=Blueprint('rag',__name__)
load_dotenv()

def get_user_email(token):
    try:
        return jwt.decode(token, key=os.getenv("JWT_SECRET"), algorithms='HS256')['email']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
@rag_bp.route('/response',methods=["POST"])
@token_required
def give_response():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid request payload"}), 400
        

        query = data.get('query')
        user_email=g.email
        top_k = data.get('top_k', 5) 
        if not user_email:
            return jsonify({"error": "Invalid or missing token"}), 401
        if not query or not user_email:
            return jsonify({"error": "Query and user email are required"}), 400

        vector_input=current_app.vector_manager.search(query,user_email,top_k)
        formatted_results = [
            {"content": result.page_content, "score": score} for result,score in vector_input
                    ]
        playload={'instruction':query,'input':formatted_results,'user_id':g.user}
        url=os.getenv('NGROK_URL')
        print(url)
        response=requests.post(url=f"https://8daa-34-125-30-122.ngrok-free.app/infer",json=playload)
        if response.status_code != 200:
                return jsonify({
                    "error": "Failed to fetch response from the server",
                    "details": response.text
                }), response.status_code

            # Return the server's response back to the client
        return jsonify({
                "message": "Request processed successfully",
                "server_response": response.json()
            }), 200

    except Exception as e:
       # logging.error(f"Error in send_request route: {e}")
        return jsonify({"error": "An internal error occurred", "details": str(e)}), 500