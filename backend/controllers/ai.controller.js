import { User } from "../models/user.model.js";
import { readResumeFromUrl } from "../ai/resumeReader.js";
import { predictRole } from "../ai/predictRole.js";
import { findMatchingJobs } from "../ai/findMatchingJobs.js";
import { generateCareerResponse } from "../ai/careerAgent.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Gemini Model
console.log(process.env.GEMINI_API_KEY);
const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
});

export const getResumeRecommendations = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user?.profile?.resume) {
            return res.status(400).json({
                success: false,
                message: "Resume not uploaded",
            });
        }

        const resumeText = await readResumeFromUrl(user.profile.resume);

        const role = await predictRole(resumeText);

        const jobs = await findMatchingJobs(role);

        return res.status(200).json({
            success: true,
            predictedRole: role,
            jobs,
        });

    } catch (error) {
        console.log("GET RESUME ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const askCareerAI = async (req, res) => {
    try {
        const { message } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user?.profile?.resume) {
            return res.status(400).json({
                success: false,
                message: "Resume not uploaded",
            });
        }

        const resumeText = await readResumeFromUrl(user.profile.resume);

        const role = await predictRole(resumeText);

        const jobs = await findMatchingJobs(role);

        const aiResponse = await generateCareerResponse({
            resumeText,
            predictedRole: role,
            jobs,
            userMessage: message,
        });

        return res.status(200).json({
            success: true,
            predictedRole: role,
            jobs,
            response: aiResponse,
        });

    } catch (error) {
        console.log("AI CHAT ERROR:", error);
        if (error.status === 429) {
            return res.status(200).json({
                success: true,
                response: "AI quota exceeded. Please try again after some time."
            });
        }
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const chatWithResume = async (req, res) => {
    try {
        const { message } = req.body;

        const user = await User.findById(req.user.id);

        if (!user?.profile?.resume) {
            return res.status(400).json({
                success: false,
                message: "Resume not uploaded",
            });
        }

        const resumeText = await readResumeFromUrl(user.profile.resume);

        const prompt = `
You are an expert career mentor.

Candidate Resume:
${resumeText}

User Question:
${message}

Give a professional, practical and clear answer based only on the resume.
`;

        const response = await model.invoke(prompt);

        return res.status(200).json({
            success: true,
            response: response.content,
        });

    } catch (error) {
        console.log("CHAT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};