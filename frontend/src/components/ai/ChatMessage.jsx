const ChatMessage = ({ text, isUser }) => {
  return (
    <div
      className={`max-w-[80%] p-3 rounded-lg mb-3 ${
        isUser
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-200 text-black"
      }`}
    >
      {text}
    </div>
  );
};

export default ChatMessage;