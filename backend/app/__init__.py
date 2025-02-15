from flask import Flask,jsonify
import os
from .config import DevelopmentConfig,ProductionConfig
from .database import init_db
from .vectorDB import init_vector_store
from .routes import register_blueprints
from .services.vectorProcessor import VectorStoreManager
from flask_cors import CORS
def create_app():
    app=Flask(__name__)
    # @app.after_request
    # def add_cors_headers(response):
    #     response.headers.add('Access-Control-Allow-Origin', '*')
    #     response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    #     response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    #     return response
    CORS(app, resources={
        r"/*": {
            "origins": [
                "http://localhost:5173",  # Remove trailing slash
                #"http://127.0.0.1:5173"   # Add alternate localhost address
            ],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True  # Important for cookies,
            
        }
    })
    #CORS(app)
    
    if os.getenv('FLASK_ENV') == 'development':
        app.config.from_object(DevelopmentConfig)
    else:
        app.config.from_object(ProductionConfig)
    try:
        init_db(app)
    except Exception as db_error:
        print(f"Database initialization failed: {db_error}")
        raise

    # Initialize the vector store
    try:
        init_vector_store(app)
    except Exception as vector_error:
        print(f"Vector store initialization failed: {vector_error}")
        raise

    # Attach vector manager to app
    with app.app_context():
        try:
            app.vector_manager = VectorStoreManager()
        except Exception as manager_error:
            print(f"Vector manager initialization failed: {manager_error}")
            raise
    register_blueprints(app)
    @app.route('/')
    def home():
        return jsonify({'message':"welcome to domain speific llm"})
    return app 