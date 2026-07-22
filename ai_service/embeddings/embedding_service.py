from langchain_huggingface import HuggingFaceEmbeddings

# BAAI embedding model
embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5",
    model_kwargs={"device": "cpu"},
    encode_kwargs={"normalize_embeddings": True},
)


def embed_documents(chunks):
    """
    Convert document chunks into vector embeddings.
    """
    texts = [doc.page_content for doc in chunks]

    vectors = embeddings.embed_documents(texts)

    return vectors


def embed_query(query: str):
    """
    Convert user query into embedding.
    """
    return embeddings.embed_query(query)