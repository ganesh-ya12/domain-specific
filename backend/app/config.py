import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    MONGO_URI = os.getenv('MONGO_URI')
    QDRANT_URL = os.getenv('QDRANT_URL', 'http://localhost:6333')
    COLLECTION_NAME = os.getenv('COLLECTION_NAME')
    CACHE_DIR = os.getenv('CACHE_DIR', './model_cache')
    DEBUG = True
    LOG_FILE = os.getenv('LOG_FILE', './app.log')

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
