import ChatBox from "../components/ChatBox";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { receiverId } = useParams();

  const userId = localStorage.getItem("userId");

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chat</h2>

      <ChatBox userId={userId} receiverId={receiverId} />
    </div>
  );
};

export default Chat;
