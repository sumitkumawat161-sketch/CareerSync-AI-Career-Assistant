import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.4,
});
console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);
export const generateCareerResponse = async ({
    resumeText,
    predictedRole,
    jobs,
    userMessage,
}) => {

    const prompt = `
You are an AI Career Assistant.

Candidate Resume:
${resumeText}

Predicted Role:
${predictedRole}

Available Matching Jobs:
${JSON.stringify(jobs, null, 2)}

User Question:
${userMessage}

Instructions:
- Answer based on resume and jobs.
- Be concise.
- Recommend jobs when relevant.
- Explain why jobs match the candidate.
`;

    const response = await llm.invoke(prompt);

    return response.content;
};