const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const roomRoutes = require("./routes/roomRoutes");
const executeRoutes = require("./routes/executeRoutes");

const app = express();
const server = http.createServer(app);

/* ---------- MIDDLEWARE FIRST ---------- */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://codesaathi-live.vercel.app"
  ],
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));

app.use(express.json());

/* ---------- ROUTES AFTER ---------- */
app.use("/api/rooms", roomRoutes);
app.use("/api/execute", executeRoutes);

/* ---------- SOCKET.IO ---------- */
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://codesaathi-live.vercel.app"
    ],
    methods: ["GET", "POST", "PUT"]
  }
});

/* ---------- DATABASE ---------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ---------- SOCKET EVENTS ---------- */
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("receive-code", code);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});