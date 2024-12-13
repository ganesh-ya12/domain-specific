import os
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import CSVLoader, PyPDFLoader, TextLoader
from typing import Dict, Any

class FileProcessor:
    def __init__(self, file_path):  # Added embedding model
        self.file_path = file_path
        self.documents = None
    def detect_file_type(self):
        file_extension = os.path.splitext(self.file_path)[1].lower() #infer file type from path
        loaders = {
            '.csv': CSVLoader,
            '.pdf': PyPDFLoader,
            '.txt': TextLoader
        }
        loader_class = loaders.get(file_extension)
        if not loader_class:
            raise ValueError(f"Unsupported file type: {file_extension}")
        return loader_class

    def load_documents(self, csv_args: Dict[str, Any] = None): #added csv args
        loader_class = self.detect_file_type()
        if loader_class == CSVLoader:
            if csv_args is None:
                csv_args = {
                    'delimiter': ',',
                    'quotechar': '"',
                }
            loader = loader_class(file_path=self.file_path, csv_args=csv_args)
        else:
            loader = loader_class(self.file_path)
        self.documents = loader.load()
        return self.documents

    def split_documents(self, useremail):
        if self.documents is None:
            raise ValueError("Documents not loaded. Call load_documents() first.")
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        docs = splitter.split_documents(self.documents)
        print(useremail)
        for doc in docs:
            doc.metadata.update({"useremail":useremail})
        return docs