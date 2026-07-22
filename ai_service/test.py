from ingestion.resume_ingestion import ingest_resume

chunks = ingest_resume(
    r"C:\Users\sumit\OneDrive\Desktop\CarrerSync\ai_service\SUMIT KUMAR KUMAWAT_2023UEC1484(1).pdf"
)

print(f"\nIndexed {chunks} chunks")