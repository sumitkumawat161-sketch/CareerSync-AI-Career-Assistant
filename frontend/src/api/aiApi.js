import axios from "axios";

const API_URL = "http://localhost:8000";
// console.log(import.meta.env.VITE_API_URL);
export const askAI = async (message) => {
  const res = await axios.post(
    `${API_URL}/api/v1/ai/chat`,
    { message },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const getRecommendations = async () => {
  const res = await axios.get(
    `${API_URL}/api/v1/user/test-resume`,
    {
      withCredentials: true,
    }
  );

  return res.data;
};