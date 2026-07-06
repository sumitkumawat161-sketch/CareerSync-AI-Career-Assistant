import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // Join room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // Send message
    socket.on("sendMessage", (data) => {
      console.log("📩 Message received:", data);

      io.to(data.roomId).emit("receiveMessage", data);
    });

    // Typing indicator
    socket.on("typing", (roomId) => {
      socket.to(roomId).emit("typing");
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};
