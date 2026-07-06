import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

// ✅ Backend URL + Axios defaults
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

// ✅ Socket.IO client
const socket = io("http://localhost:8000", {
  withCredentials: true,
});

const ChatBox = ({ userId, receiverId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // ✅ Compute roomId safely
  const roomId =
    userId && receiverId
      ? userId < receiverId
        ? `${userId}_${receiverId}`
        : `${receiverId}_${userId}`
      : "";

  // ✅ Fetch chat history when userId & receiverId are ready
  useEffect(() => {
    if (!userId || !receiverId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/v1/chat/${userId}/${receiverId}`);
        if (Array.isArray(res.data)) setMessages(res.data);
        else if (Array.isArray(res.data.data)) setMessages(res.data.data);
        else setMessages([]);
      } catch (err) {
        console.error("Fetch error:", err);
        setMessages([]);
      }
    };

    fetchMessages();
  }, [userId, receiverId]);

  // ✅ Socket.IO: join room & listen for messages
  useEffect(() => {
    if (!roomId) return;

    // Join room
    socket.emit("joinRoom", roomId);

    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      if (data.roomId === roomId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    // Listen for typing indicator
    socket.on("typing", () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
    };
  }, [roomId]);

  // ✅ Send message function
  const handleSend = async () => {
    if (!message.trim()) return;

    // Validate userId and receiverId
    if (!userId || !receiverId) {
      console.warn("Cannot send message: missing sender or receiver");
      return;
    }

    const msgData = {
      sender: userId,
      receiver: receiverId,
      message,
      roomId,
    };

    try {
      // Save message to backend
      const response = await axios.post("/api/v1/chat/send", msgData);

      // Use saved message if backend returns it
      const savedMessage = response.data.data || msgData;

      // Update local messages
      setMessages((prev) => [...prev, savedMessage]);
      setMessage("");

      // Emit via socket for real-time updates
      socket.emit("sendMessage", savedMessage);
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg p-4">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.sender === userId ? "text-right" : "text-left"
              }`}
            >
              <span className="bg-gray-200 px-3 py-2 rounded-lg inline-block">
                {msg.message}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet</p>
        )}
      </div>

      {/* Typing indicator */}
      {isTyping && <p className="text-sm text-gray-500 mb-2">Typing...</p>}

      {/* Input box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (roomId) socket.emit("typing", roomId);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1 border px-3 py-2 rounded"
          placeholder={
            userId && receiverId
              ? "Type a message..."
              : "Loading chat..."
          }
          disabled={!userId || !receiverId}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!userId || !receiverId}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
