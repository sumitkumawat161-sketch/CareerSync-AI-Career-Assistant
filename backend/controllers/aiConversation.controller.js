import { Chat } from "../models/chat.model.js";

/**
 * Get current user's chat history.
 * If chat doesn't exist, create one.
 */
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    let chat = await Chat.findOne({ user: userId });

    // Create chat for first-time user
    if (!chat) {
      chat = await Chat.create({
        user: userId,
        messages: [],
      });
    }

    return res.status(200).json({
      success: true,
      messages: chat.messages,
    });
  } catch (error) {
    console.log("GET CHAT HISTORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load chat history.",
    });
  }
};