import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import connectDB from "./config/db.js";
import ApiError from "./utils/ApiError.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import path from "path";
import { Server as socketIo } from "socket.io";
import { scheduleWeeklyPolls } from "./utils/pollScheduler.js";

// Load environment variables
dotenv.config();
// Initialize Express app
const app = express();
app.use(express.json({ limit: "10mb" })); // Increase limit for profile images
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
const PORT = process.env.PORT || 5000;

// Create HTTP server for Socket.IO
const httpServer = createServer(app);

// Initialize Socket.IO
// const io = initializeSocket(httpServer); 

// Connect to MongoDB
connectDB();

// server defining 
const io = new socketIo(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", "https://learnloop-sykx.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});


// Middleware
app.use(
  cors({
    origin: [
      "https://learnloop-sykx.onrender.com",
      "http://localhost:5173",
      "http://localhost:5174", // add any other frontend URLs you use
    ],
    credentials: true, // if you use cookies/sessions
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  })
);

app.use(cookieParser());

// Helper: Log static file serving for debug
console.log("Serving static files from:", path.resolve("uploads"));
app.use("/uploads", express.static("uploads"));

// Add debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);

// Import new routes
import mentorRoutes from "./routes/mentor.js";
import studentRoutes from "./routes/student.js";
import subjectRoutes from "./routes/subject.js";
import profileRoutes from "./routes/profile.js";
import notificationRoutes from "./routes/notification.js";
import ratingRoutes from "./routes/rating.js";
import pollRoutes from "./routes/poll.js";
import userRoutes from "./routes/user.js";

//global
import groupChatSocket from './groupChatSocket.js';
import groupchatroute from './routes/groupChat.route.js'

// privte chat 
import chatRoutes from "./routes/chat.route.js";
import messageRoutes from "./routes/Message.route.js";

// New routes for mentorship platform
app.use("/api/mentors", mentorRoutes);
app.use("/api/mentor", mentorRoutes); // Add this route to match frontend calls
app.use("/api/students", studentRoutes);
app.use("/api/student", studentRoutes); // Add this route to match frontend calls
app.use("/api/subjects", subjectRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/user", userRoutes);

// global
app.use('/api/messages', groupchatroute);
// private chat
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// 404 Route Not Found handler
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

const socketHandler = groupChatSocket(io);

app.get("/", (req, res) => {
  res.send("Welcome to the Learnloop API");
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  server.close((err) => {
    if (err) {
      console.error("Error during server shutdown:", err);
      process.exit(1);
    }

    console.log("HTTP server closed");

    // Close database connection
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed");

      // Cleanup socket connections
      if (socketHandler && socketHandler.cleanup) {
        socketHandler.cleanup();
        console.log("Socket connections cleaned up");
      }

      console.log("✅ Graceful shutdown completed");
      process.exit(0);
    });
  });
    // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error("Forced shutdown due to timeout");
    process.exit(1);
  }, 10000);
};

// Listen for shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err); // Add this line for debugging
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json(
      new ApiError(
        statusCode,
        err.message || "Internal Server Error",
        err.errors || []
      )
    );
});
// Start Server with Socket.IO
httpServer.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🔌 Socket.IO initialized and ready for connections`);

  // Initialize weekly poll scheduler
  scheduleWeeklyPolls();
});

export default app;
