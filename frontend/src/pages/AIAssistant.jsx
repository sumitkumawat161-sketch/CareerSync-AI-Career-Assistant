import { useEffect, useState } from "react";
import { askAI } from "../api/aiApi";

import ResumeInsights from "../components/ai/ResumeInsights";
import RecommendedJobs from "../components/ai/RecommendedJobs";
import ChatBox from "../components/ai/ChatBox";

const AIAssistant = () => {

  const [role, setRole] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    const loadAIData = async () => {

      try {

        const res = await askAI(
          "Suggest jobs for me"
        );

        setRole(
          res.predictedRole
        );

        setJobs(
          res.jobs || []
        );

      } catch (error) {

        console.log(error);

      }
    };

    loadAIData();

  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        AI Career Assistant
      </h1>

      <div className="grid md:grid-cols-2 gap-5">

        <ResumeInsights
          role={role}
        />

        <RecommendedJobs
          jobs={jobs}
        />

      </div>

      <div className="mt-6">
        <ChatBox />
      </div>

    </div>
  );
};

export default AIAssistant;