from config import llm
from retrieval.retriever import get_retriever
from prompts.career_prompt import career_prompt

def ask_career_ai(
    question: str,
    user_id: str,
    jobs_context: str = "",
    history: list = []
):
    # print("FUNCTION HISTORY")
    # print(history)
    # -----------------------------
    # Retrieve Resume Documents
    # -----------------------------
    retriever = get_retriever(user_id)
    docs = retriever.invoke(question)

    print("=" * 80)
    print(f"Retrieved Docs: {len(docs)}")
    print("=" * 80)

    # -----------------------------
    # Resume Context
    # -----------------------------
    resume_context = "\n\n".join(
        doc.page_content for doc in docs
    )

    # -----------------------------
    # Conversation History
    # -----------------------------
    history_text = ""

    if history:
        history_text = "\n".join(
            [
                f"{msg.role.upper()}: {msg.content}"
                if hasattr(msg, "role")
                else f"{msg['role'].upper()}: {msg['content']}"
                for msg in history
            ]
        )

    # -----------------------------
    # Combined Context
    # -----------------------------
    context = f"""
======================
CONVERSATION HISTORY
======================

{history_text}

======================
CANDIDATE RESUME
======================

{resume_context}

======================
AVAILABLE JOBS
======================

{jobs_context}
"""
    
    # print("=" * 80)
    # print("HISTORY")
    # print(history_text)
    # print("=" * 80)
    # print("\nContext Length:", len(context))
    # print("========== CONTEXT ==========")
    # print(context)
    # print("=============================")

    # -----------------------------
    # Prompt
    # -----------------------------
    prompt = career_prompt.invoke({
    "context": context,
    "question": question
    })

    response = llm.invoke(prompt)

    return response.content