from pymongo import MongoClient
from datetime import datetime

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['domain']

# Define the complete user schema
user_schema = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["username", "email", "password", "access_level", "created_at"],
        "properties": {
            "username": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "email": {
                "bsonType": "string",
                "pattern": "^.+@.+$",
                "description": "must be a valid email format and is required"
            },
            "password": {
                "bsonType": "string",
                "minLength": 8,
                "description": "must be a hashed string and is required"
            },
            "company_name": {
                "bsonType": "string",
                "description": "SME company name, optional"
            },
            "preferences": {
                "bsonType": "object",
                "properties": {
                    "industry": {
                        "bsonType": "string",
                        "description": "Industry type, optional"
                    },
                    "language": {
                        "bsonType": "string",
                        "enum": ["en", "es", "fr", "de"],
                        "description": "Preferred chatbot language"
                    },
                    "llm_experience": {
                        "bsonType": "string",
                        "enum": ["beginner", "intermediate", "expert"],
                        "description": "User's experience level with LLM"
                    },
                    "rag_experience": {
                        "bsonType": "string",
                        "enum": ["beginner", "intermediate", "expert"],
                        "description": "User's experience level with RAG"
                    }
                }
            },
            "last_active": {
                "bsonType": "date",
                "description": "timestamp for last active session, optional"
            },
            "access_level": {
                "bsonType": "string",
                "enum": ["admin", "manager", "user"],
                "description": "defines the user's access level and is required"
            },
            "created_at": {
                "bsonType": "date",
                "description": "timestamp when the user is created"
            }
        }
    }
}

# Create a users collection with the schema validation
db.create_collection("users", validator=user_schema)

print("User collection created with validation schema.")