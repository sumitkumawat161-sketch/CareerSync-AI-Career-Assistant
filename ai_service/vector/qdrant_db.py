from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

from langchain_qdrant import QdrantVectorStore

from config import embeddings

COLLECTION_NAME = "career_sync"

# Local in-memory database
client = QdrantClient(path="./qdrant_data")

# Create collection if it doesn't exist
collections = client.get_collections().collections
existing = [c.name for c in collections]

if COLLECTION_NAME not in existing:
    client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(
        size=3072,
        distance=Distance.COSINE,
    ),
    )

vector_store = QdrantVectorStore(
    client=client,
    collection_name=COLLECTION_NAME,
    embedding=embeddings,
)