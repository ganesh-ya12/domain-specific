from pymongo import MongoClient
from datetime import datetime

# Connect to MongoDB
client = MongoClient('mongodb+srv://22bd1a057y:2004@cluster0.z7w1qa9.mongodb.net/domain')
db = client['domain']

# Revised user schema
user_schema = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["username", "email", "access_level", "created_at"],
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
            },
            "password": {
                "bsonType": ["string", "null"],
                "minLength": 8,
                "description": "hashed string for normal signup"
            },
            "googleId": {
                "bsonType": ["string", "null"],
                "description": "Google OAuth ID for Google signup"
            },
            "githubId": {
                "bsonType": ["string", "null"],
                "description": "GitHub OAuth ID for GitHub signup"
            }
        }
    }
}

# Check if the collection already exists
if "users" not in db.list_collection_names():
    # Create a users collection with the schema validation
    db.create_collection("users", validator=user_schema)
    print("User collection created with validation schema.")
else:
    # Modify existing collection's validator
    db.command({
        "collMod": "users",
        "validator": user_schema,
        "validationLevel": "strict"
    })
    print("User collection validator updated.")