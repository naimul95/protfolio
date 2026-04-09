const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running without MongoDB!");
});

// 🔹 Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server working fine ✅" });
});

// 🔹 Example API (dummy data)
app.get("/projects", (req, res) => {
  res.json([
    { id: 1, name: "Portfolio Website" },
    { id: 2, name: "E-commerce App" },
  ]);
});

// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});