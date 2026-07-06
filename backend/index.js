// index.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import chatRoute from "./routes/chat.route.js";
import aiRoute from "./routes/ai.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://smart-job-portal-26cd.vercel.app"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(" User connected:", socket.id);

  // Join a chat room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Broadcast message
  socket.on("sendMessage", (data) => {
    io.to(data.roomId).emit("receiveMessage", data);
  });

  // Typing indicator
  socket.on("typing", (roomId) => {
    socket.to(roomId).emit("typing");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  CORS configuration
const allowedOrigins = ["http://localhost:5173", "https://smart-job-portal-26cd.vercel.app"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS error: origin not allowed"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

//  Routes
app.get("/", (req, res) => res.send("API is running 🚀"));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/ai", aiRoute);


// Start server
server.listen(PORT, async () => {
  await connectDB();
  console.log(` Server + Socket.IO running on port ${PORT}`);
});
