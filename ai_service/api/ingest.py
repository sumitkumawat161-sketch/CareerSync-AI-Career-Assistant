from fastapi import APIRouter
from pydantic import BaseModel

from ingestion.resume_ingestion import ingest_resume

router = APIRouter()


class ResumeRequest(BaseModel):
    resume_url: str
    user_id: str


@router.post("/ingest")
def ingest(request: ResumeRequest):

    total_chunks = ingest_resume(
        request.resume_url,
        request.user_id
        )

    return {
        "success": True,
        "chunks": total_chunks
    }