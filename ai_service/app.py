from fastapi import FastAPI

from api.chat import router as chat_router
from api.ingest import router as ingest_router

app = FastAPI(
    title="CareerSync AI",
    version="1.0.0"
)

app.include_router(chat_router)
app.include_router(ingest_router)


@app.get("/")
def home():
    return {
        "message": "CareerSync AI is running"
    }