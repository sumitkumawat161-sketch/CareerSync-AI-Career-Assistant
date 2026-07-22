import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AI_API_END_POINT } from "@/utils/constant";
import ChatHeader from "@/components/ai/ChatHeader";
import SuggestedQuestions from "@/components/ai/SuggestedQuestions";
import MessageBubble from "@/components/ai/MessageBubble";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const CareerSyncAI = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi 👋 I'm CareerSync AI. Ask me anything about your resume, matching jobs, required skills, interview preparation, or career guidance.",
    },
  ]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const loadChatHistory = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/ai-conversation/history`,
        {
          withCredentials: true,
        },
      );

      if (res.data.messages.length > 0) {
        setMessages(res.data.messages);
      }

      setHistoryLoaded(true);
    } catch (error) {
      console.log(error);
      setHistoryLoaded(true);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const question = input;
    setInput("");

    try {
      setLoading(true);

      const res = await axios.post(
        `${AI_API_END_POINT}/rag`,
        {
          question,
        },
        {
          withCredentials: true,
        },
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.answer,
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Unable to connect to CareerSync AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);
  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col px-4">
      {/* Header */}
      <div className="shrink-0 py-4">
        <ChatHeader />
      </div>
      {historyLoaded && messages.length === 1 && (
        <div className="shrink-0 pb-4">
          <SuggestedQuestions setInput={setInput} />
        </div>
      )}
      {/* Chat Area */}
      <div
        className="flex-1 overflow-y-auto rounded-2xl border bg-gray-50 p-6 space-y-5"
        style={{
          minHeight: 0,
        }}
      >
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        {loading && (
          <div className="flex items-end gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#6A38C2] to-indigo-600 flex items-center justify-center text-white shadow">
              🤖
            </div>

            <div className="bg-white border rounded-2xl rounded-bl-md px-5 py-4 shadow">
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"></span>

                <span
                  className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></span>

                <span
                  className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 py-4 flex gap-3 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask about resume, jobs, companies..."
          className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A38C2]"
        />

        <button
          onClick={sendMessage}
          className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-6 rounded-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CareerSyncAI;
