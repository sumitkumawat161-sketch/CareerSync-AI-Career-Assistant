from chains.rag_chain import ask_career_ai

answer = ask_career_ai(
    "Explain my MERN project."
)

print("\n")
print("=" * 100)
print(answer)