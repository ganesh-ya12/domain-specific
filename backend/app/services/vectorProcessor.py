from langchain.schema import Document
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from flask import current_app

class VectorStoreManager:
    def __init__(self):
        """
        Initialize the Pinecone vector store using the Flask application context.
        """
        self.pinecone = current_app.vector_store

    def add_documents(self, documents):
        """
        Adds documents to the Pinecone vector store.

        :param documents: List of Document objects containing the content to be stored.
        :param metadatas: List of metadata dictionaries for the documents (optional).
        """
        metadatas  = [{"useremail": doc.metadata.get("useremail"), "source": doc.metadata.get("source"), "page": doc.metadata.get("page")} for doc in documents]  # create metadata
        for i in metadatas:
            print(i)
        texts = [doc.page_content for doc in documents]
        self.pinecone.add_texts(texts=texts, metadatas=metadatas)

    def search(self, query, user_email=None, top_k=5):
        """
        Performs a similarity search on the Pinecone vector store.

        :param query: The query string for similarity search.
        :param user_email: The email of the user to filter documents (optional).
        :param top_k: Number of top results to retrieve.
        :return: List of documents with scores.
        """
        filter_criteria = {"useremail": {"$eq": user_email}} if user_email else None
        # retriever = self.pinecone.as_retriever(search_kwargs={"filter": filter_criteria, "k": top_k})
        # return retriever.invoke(query)
        results = self.pinecone.similarity_search_with_score(
                    query=query,
                    k=top_k,
                )
        return results
    def get_retriever(self, useremail: str): # Return retriever object
        return self.vectorstore.as_retriever(search_kwargs={"filter": {"username": {"$eq": useremail}}})
