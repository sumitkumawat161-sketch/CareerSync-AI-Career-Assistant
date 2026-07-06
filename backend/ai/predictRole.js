import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

export const predictRole = async (resumeText) => {
  const prompt = `
Analyze this resume and determine the BEST job role.

Consider:
- Skills
- Projects
- Technologies
- Experience

Return ONLY one role.

Resume:
${resumeText}
`;
  const response = await model.invoke(prompt);

  return response.content.trim();
};