from qdrant_client.models import Filter, FieldCondition, MatchValue

from vector.qdrant_db import vector_store


def get_retriever(user_id: str):

    return vector_store.as_retriever(
        search_kwargs={
            "k": 4,
            "filter": Filter(
                must=[
                    FieldCondition(
                        key="metadata.user_id",
                        match=MatchValue(value=user_id)
                    )
                ]
            )
        }
    )