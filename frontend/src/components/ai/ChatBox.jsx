import { useState } from "react";
import { askAI } from "../../api/aiApi";
import ChatMessage from "./ChatMessage";

const ChatBox = () => {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {

    if (!input.trim()) return;

    const userMsg = {
      text: input,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMsg]);

    const question = input;
    setInput("");
    setLoading(true);

    try {

      const res = await askAI(question);

      const aiMsg = {
        text: res.response,
        isUser: false,
      };

      setMessages((prev) => [...prev, aiMsg]);

    } catch (err) {

      setMessages((prev) => [
        ...prev,
        {
          text: "AI Error",
          isUser: false,
        },
      ]);

      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 border">

      <h2 className="text-xl font-bold mb-4">
        AI Career Assistant
      </h2>

      <div className="h-96 overflow-y-auto border rounded p-3 mb-4">

        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            text={msg.text}
            isUser={msg.isUser}
          />
        ))}

        {loading && (
          <p>Thinking...</p>
        )}

      </div>

      <div className="flex gap-2">

        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Ask AI..."
          className="border flex-1 p-2 rounded"
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-5 rounded"
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default ChatBox;