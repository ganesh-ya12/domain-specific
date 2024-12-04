from flask import Flask,jsonify
import os
from .config import DevelopmentConfig,ProductionConfig
from .database import init_db
from .routes import register_blueprints
from flask_cors import CORS
def create_app():
    app=Flask(__name__)
    CORS(app, resources={
        r"/*": {
            "origins": [
                "http://localhost:5173",  # Remove trailing slash
                "http://127.0.0.1:5173"   # Add alternate localhost address
            ],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True  # Important for cookies
        }
    })
    #CORS(app)
    if os.getenv('FLASK_ENV') == 'development':
        app.config.from_object(DevelopmentConfig)
    else:
        app.config.from_object(ProductionConfig)
    init_db(app)
    register_blueprints(app)
    @app.route('/')
    def home():
        return jsonify({'message':"welcome to domain speific llm"})
    return app