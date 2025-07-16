require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/tickets");
const auth = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration (allow frontend on Vercel)
app.use(cors({
  origin: "https://pawar-tours-travel.vercel.app", // your deployed frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Body parser middleware
app.use(express.json());

// ✅ Log all requests (move before routes)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ✅ Base Routes
app.get("/", (req, res) => {
  res.send("Welcome to Pawar Tours & Travels API");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

app.get("/api/auth/test", (req, res) => {
  res.send("Auth route working!");
});

// ✅ Route Mounting
app.use("/api/auth", authRoutes);
app.use("/api/tickets", auth, ticketRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
