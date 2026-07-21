from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from chains.rag_chain import ask_career_ai


router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    question: str
    user_id: str
    jobs_context: str = ""
    history: List[Message] = []

@router.post("/chat")
def chat(request: ChatRequest):

    answer = ask_career_ai(
    request.question,
    request.user_id,
    request.jobs_context,
    history=request.history
)

    return {
        "success": True,
        "answer": answer
    }