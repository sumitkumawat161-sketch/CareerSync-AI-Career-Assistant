import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getChatHistory,
} from "../controllers/aiConversation.controller.js";

const router = express.Router();

// Get logged-in user's chat history
router.get(
  "/history",
  isAuthenticated,
  getChatHistory
);

export default router;