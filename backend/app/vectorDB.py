import logging
from langchain_pinecone import PineconeVectorStore
from langchain_community.embeddings import HuggingFaceEmbeddings
from pinecone import Pinecone, ServerlessSpec
from .config import Config

def init_vector_store(app):
    """
    Initializes the Pinecone vector store and attaches it to the Flask app instance.
    """
    try:
        # Initialize Pinecone client
        pinecone_client=Pinecone(api_key=Config.PINECONE_API_KEY)

        # Initialize embedding model
        embedding_model = HuggingFaceEmbeddings(
            model_name="BAAI/bge-large-en",
            cache_folder=Config.CACHE_DIR
        )

        # Create or connect to the collection in Pinecone
        index_name = Config.COLLECTION_NAME
        # if index_name not in pinecone_client.list_indexes():
        #     pinecone_client.create_index(index_name, dimension=1024,spec=ServerlessSpec(cloud="aws", region="us-east-1"))

        # Initialize the vector store
        vector_store = PineconeVectorStore(
            index=pinecone_client.Index(index_name),
            embedding=embedding_model
        )

        # Attach the vector store to the Flask app instance for global access
        app.vector_store = vector_store

        print("Pinecone vector store initialized successfully.")
        logging.info("Pinecone vector store initialized successfully.")
    except Exception as e:
        logging.error(f"Error initializing Pinecone vector store: {e}")
        raise
