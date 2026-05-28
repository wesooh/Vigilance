import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http"; // 👈 Added for Socket.io
import { Server } from "socket.io"; // 👈 Added for Socket.io
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import workerRoutes from "./routes/workerRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import badgeRoutes from "./routes/badgeRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

connectDB();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
 })
);
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/workers", workerRoutes);
app.use("/categories", categoryRoutes);
app.use("/messages", messageRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin", adminRoutes);
app.use("/upload", uploadRoutes);
app.use("/notifications", notificationRoutes);
app.use("/files", express.static("src/uploads"));
app.use("/bookings", bookingRoutes);
app.use("/reviews", reviewRoutes);
app.use("/badges", badgeRoutes);
app.use("/availability", availabilityRoutes);
app.use("/trainings", trainingRoutes);
app.use("/contracts", contractRoutes);
app.use("/admin/dashboard", dashboardRoutes);
app.use("/locations", locationRoutes);
app.use("/chat", chatRoutes);
app.get("/", (req, res) => {
  res.send("Vigilance API is running...");
});

// ==========================================
// 🔌 CREATE HTTP SERVER & SOCKET.IO SETUP
// ==========================================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

// SOCKET CONNECTION LOGIC
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join personal room
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
  });

  // Send message
  socket.on("sendMessage", (data) => {
    const { senderId, receiverId, message } = data;

    io.to(receiverId).emit("receiveMessage", {
      senderId,
      message,
      createdAt: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ==========================================
// 🚀 START SERVER WITH SOCKET
// ==========================================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running with Socket.io on port ${PORT}`);
});
