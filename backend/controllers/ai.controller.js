import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import { readResumeFromUrl } from "../ai/resumeReader.js";
import { predictRole } from "../ai/predictRole.js";
import { findMatchingJobs } from "../ai/findMatchingJobs.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Chat } from "../models/chat.model.js";
import axios from "axios";
const AI_BASE_URL = "http://127.0.0.1:8000";
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

export const askRagAI = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user?.profile?.resume) {
      return res.status(400).json({
        success: false,
        message: "Resume not uploaded",
      });
    }

    // -----------------------------
    // Get/Create User Chat
    // -----------------------------
    let chat = await Chat.findOne({ user: userId });

    if (!chat) {
      chat = await Chat.create({
        user: userId,
        messages: [],
      });
    }

    // Save User Message
    chat.messages.push({
      role: "user",
      content: question,
    });

    // -----------------------------
    // Resume
    // -----------------------------
    const resumeText = await readResumeFromUrl(user.profile.resume);

    // Predict Role
    const role = await predictRole(resumeText);
    console.log("Predicted Role:", role);

    // Matching Jobs
    const jobs = await findMatchingJobs(role);

    console.log("Jobs Found:", jobs.length);

    // Build Jobs Context
    const jobsContext = jobs
      .map(
        (job) => `
Company: ${job.company?.name}

Role: ${job.title}

Description:
${job.description}

Requirements:
${job.requirements}

Location:
${job.location}
`,
      )
      .join("\n\n");

    // -----------------------------
    // Ask FastAPI
    // -----------------------------
    // Last 10 messages only
    const history = chat.messages.slice(-10);

    const response = await axios.post("http://127.0.0.1:8000/chat", {
      question,
      user_id: userId,
      jobs_context: jobsContext,
      history,
    });

    // Save AI Response
    chat.messages.push({
      role: "assistant",
      content: response.data.answer,
    });

    // Keep only last 50 messages
    if (chat.messages.length > 50) {
      chat.messages = chat.messages.slice(-50);
    }

    await chat.save();

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: error.response?.data || error.message,
    });
  }
};
