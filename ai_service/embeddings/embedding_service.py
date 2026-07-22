import os
from dotenv import load_dotenv

from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()

# Gemini Embedding Model
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/text-embedding-004",
    google_api_key=os.getenv("GOOGLE_API_KEY"),
)


def embed_documents(chunks):
    """
    Convert document chunks into vector embeddings.
    """
    texts = [doc.page_content for doc in chunks]
    return embeddings.embed_documents(texts)


def embed_query(query: str):
    """
    Convert user query into embedding.
    """
    return embeddings.embed_query(query)