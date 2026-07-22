from utils.pdf_loader import load_pdf
from utils.text_splitter import split_documents
from vector.qdrant_db import vector_store
import requests
import tempfile
import os


def download_pdf(resume_url: str):

    response = requests.get(resume_url)

    response.raise_for_status()

    temp_file = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    )

    temp_file.write(response.content)
    temp_file.close()

    return temp_file.name


def ingest_resume(resume_url: str, user_id: str):

    # Download Cloudinary PDF
    pdf_path = download_pdf(resume_url)

    try:

        print("Loading PDF...")

        docs = load_pdf(pdf_path)

        print("Splitting document...")

        chunks = split_documents(docs)
        for chunk in chunks:
            chunk.metadata["user_id"] = user_id
        print(f"Created {len(chunks)} chunks")

        print("Storing embeddings...")

        vector_store.add_documents(chunks)

        print("Resume indexed successfully!")

        return len(chunks)

    finally:
        if os.path.exists(pdf_path):
            os.remove(pdf_path)