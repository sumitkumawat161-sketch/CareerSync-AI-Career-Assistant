// controllers/chat.controller.js
import Message from "../models/messageModel.js";

// 🔥 Send & Save Message
export const saveMessage = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { sender, receiver, message, roomId } = req.body;

    // ✅ Validate required fields
    if (!sender || !receiver || !message || !roomId) {
      return res.status(400).json({
        success: false,
        message: "Missing sender, receiver, message, or roomId",
      });
    }

    // 🔥 Create & save message
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      roomId,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error in saveMessage:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
};

// 🔥 Get chat history between two users
export const getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    if (!userId1 || !userId2) {
      return res.status(400).json({
        success: false,
        message: "Missing user IDs",
      });
    }

    // ✅ Create same roomId logic as front-end
    const roomId =
      userId1.toString() < userId2.toString()
        ? `${userId1}_${userId2}`
        : `${userId2}_${userId1}`;

    const messages = await Message.find({ roomId })
      .sort({ createdAt: 1 })
      .populate("sender", "fullname email")
      .populate("receiver", "fullname email");

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error in getMessages:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error.message,
    });
  }
};

// 🔥 Mark messages as seen (optional advanced feature)
export const markAsSeen = async (req, res) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return res.status(400).json({
        success: false,
        message: "Missing roomId",
      });
    }

    await Message.updateMany(
      { roomId, isSeen: false },
      { $set: { isSeen: true } }
    );

    return res.status(200).json({
      success: true,
      message: "Messages marked as seen",
    });
  } catch (error) {
    console.error("Error in markAsSeen:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating seen status",
      error: error.message,
    });
  }
};
