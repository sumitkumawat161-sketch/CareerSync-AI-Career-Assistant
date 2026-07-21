const suggestions = [
  "Review my resume",
  "Which jobs match my profile?",
  "What skills am I missing?",
  "Tell me about Uber requirements",
  "Prepare interview questions",
  "How can I improve my resume?",
];

const SuggestedQuestions = ({ setInput }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">

      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        ✨ Suggested Questions
      </h2>

      <div className="flex flex-wrap gap-3">

        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => setInput(item)}
            className="
              px-4
              py-2
              rounded-full
              border
              bg-violet-50
              text-violet-700
              hover:bg-[#6A38C2]
              hover:text-white
              transition
              duration-200
            "
          >
            {item}
          </button>
        ))}

      </div>

    </div>
  );
};

export default SuggestedQuestions;