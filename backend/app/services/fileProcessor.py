import os
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import CSVLoader, PyPDFLoader, TextLoader

class FileProcessor:
    def __init__(self, file_type,file_path):
        self.file_path= file_path
        self.file_type=file_type
        self.documents = None

    def detect_file_type(self):
        file_extension = self.file_type
        loaders = {
            '.csv': CSVLoader,
            '.pdf': PyPDFLoader,
            '.txt': TextLoader
        }
        return loaders.get(file_extension)

    def load_documents(self):
        loader_class = self.detect_file_type()
        if not loader_class:
            raise ValueError("Unsupported file type")
        loader = loader_class(self.file_path)
        self.documents = loader.load()
        return self.documents

    def split_documents(self,metadata_updates):
        if not self.documents:
            raise ValueError("No documents loaded")
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        docs= splitter.split_documents(self.documents)
        for doc in docs:
              doc.metadata.update(metadata_updates)
        return docs
