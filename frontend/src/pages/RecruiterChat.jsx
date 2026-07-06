// pages/RecruiterChat.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ChatBox from "../components/ChatBox.jsx";

const RECRUITER_ID = "your_recruiter_id_here";

const RecruiterChat = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(`/api/v1/chat/users/${RECRUITER_ID}`);
        setCandidates(res.data.data || []);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setCandidates([]);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar: candidate list */}
      <div className="w-1/4 border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Candidates</h2>
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <div
              key={candidate._id}
              onClick={() => setSelectedCandidate(candidate)}
              className={`p-2 mb-2 rounded cursor-pointer ${
                selectedCandidate?._id === candidate._id
                  ? "bg-blue-200"
                  : "bg-gray-100"
              }`}
            >
              {candidate.fullname || candidate.email || candidate._id}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No candidates yet</p>
        )}
      </div>

      {/* ChatBox area */}
      <div className="flex-1 p-4">
        {selectedCandidate ? (
          <ChatBox
            userId={RECRUITER_ID}
            receiverId={selectedCandidate._id}
          />
        ) : (
          <p className="text-gray-500 text-center mt-20">
            Select a candidate to start chat
          </p>
        )}
      </div>
    </div>
  );
};

export default RecruiterChat;
