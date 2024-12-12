import logging
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from langchain_huggingface import HuggingFaceEmbeddings
from .config import Config

#vector_store = None  # Placeholder for the vector store instance

def init_vector_store(app):
    global vector_store
    try:
        # Initialize Qdrant client
        qdrant_client = QdrantClient(url=Config.QDRANT_URL)

        # Initialize embedding model
        embedding_model = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2",
            cache_folder=Config.CACHE_DIR
        )

        # Initialize the vector store
        vector_store = QdrantVectorStore(
            client=qdrant_client,
            collection_name=Config.COLLECTION_NAME,
            embedding=embedding_model
        )

        # Attach the vector store to the Flask app instance for global access
        app.vector_store = vector_store

        print("Vector store initialized successfully.")
        logging.info("Vector store initialized successfully.")
    except Exception as e:
        logging.error(f"Error initializing vector store: {e}")
        raise
