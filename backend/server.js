const express = require("express");
const connectDB = require("./src/config/database");
const dotenv = require("dotenv");
require("dotenv").config();

const authRoutes = require("./src/routes/auth");
const testRoutes = require("./src/routes/test");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
