from langchain_text_splitters import RecursiveCharacterTextSplitter


def split_documents(documents):
    """
    Split LangChain Documents into smaller chunks.

    Args:
        documents: List of LangChain Document objects

    Returns:
        List of chunked Documents
    """

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            ""
        ]
    )

    chunks = splitter.split_documents(documents)

    return chunks