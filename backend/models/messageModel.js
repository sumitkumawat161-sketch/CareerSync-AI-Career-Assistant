import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },    // userId as string
    receiver: { type: String, required: true },  // userId as string
    roomId: { type: String, required: true },
    message: { type: String, required: true, trim: true },
    isSeen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
