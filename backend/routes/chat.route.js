import express from "express";
import { saveMessage, getMessages } from "../controllers/chat.controller.js";

const router = express.Router();

// ✅ Save message
router.post("/send", saveMessage);

// ✅ Get chat history
router.get("/:userId1/:userId2", getMessages);

export default router;
