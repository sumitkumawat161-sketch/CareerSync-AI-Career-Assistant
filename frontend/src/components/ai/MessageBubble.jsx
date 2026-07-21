import { Bot, User } from "lucide-react";

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-end gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#6A38C2] to-indigo-600 flex items-center justify-center text-white shadow">
          <Bot size={20} />
        </div>
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-5 py-4 shadow-sm whitespace-pre-wrap ${
          isUser
            ? "bg-[#6A38C2] text-white rounded-br-md"
            : "bg-white border rounded-bl-md"
        }`}
      >
        <p className="leading-7">{message.content}</p>

        <div
          className={`text-xs mt-2 ${
            isUser ? "text-violet-200" : "text-gray-400"
          }`}
        >
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {isUser && (
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center shadow">
          <User size={18} />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;