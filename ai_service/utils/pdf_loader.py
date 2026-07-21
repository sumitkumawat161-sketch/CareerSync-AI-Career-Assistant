from pathlib import Path
from langchain_community.document_loaders import PyMuPDFLoader


def load_pdf(pdf_path: str):
    pdf_file = Path(pdf_path)

    if not pdf_file.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_file}")

    loader = PyMuPDFLoader(str(pdf_file))
    return loader.load()