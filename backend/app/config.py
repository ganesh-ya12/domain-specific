import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    MONGO_URI = os.getenv('MONGO_URI')
    QDRANT_URL = os.getenv('QDRANT_URL', 'http://localhost:6333')
    COLLECTION_NAME = os.getenv('COLLECTION_NAME')
    CACHE_DIR = os.getenv('CACHE_DIR', './model_cache')
    DEBUG = True
    LOG_FILE = os.getenv('LOG_FILE', './app.log')
    PINECONE_API_KEY = os.getenv('PINECONE_KEY')
    #PINECONE_ENV = "your-pinecone-environment"  # e.g., "us-west1-gcp"
    COLLECTION_NAME = os.getenv("COLLECTION_NAME")

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
