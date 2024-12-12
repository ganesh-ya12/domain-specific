from langchain_community.vectorstores import Qdrant
from langchain.schema import Document
from flask import current_app
class VectorStoreManager:
    def __init__(self):
        # self.collection_name = Config.COLLECTION_NAME
        self.qdrant = current_app.vector_store

    def add_documents(self, documents):
        docs = [Document(page_content=doc.page_content) for doc in documents]
        self.qdrant.add_documents(documents=docs)

    def search(self, query, user_email, top_k=5):
        query_results = self.qdrant.similarity_search_with_score(
            query=query,
            #top_k=top_k,
            #filter={"user_email": user_email},
        )
        return query_results
