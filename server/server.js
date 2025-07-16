require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/tickets");
const auth = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Base Routes
app.get("/", (req, res) => {
  res.send("Welcome to Pawar Tours & Travels API");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Route Mounting
app.use("/api/auth", authRoutes);        // ✅ /api/auth/*
app.use("/api/tickets", auth, ticketRoutes);  // ✅ /api/tickets/* (protected)

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
