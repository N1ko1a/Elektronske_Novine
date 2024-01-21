require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const mongoose = require("mongoose");

// Povezivanje sa bazom
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// Konfigurisanje da server prima JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Routes, logic for endpoints
const newsRoutes = require("./routes/news");
app.use("/news", newsRoutes);

const userRoutes = require("./routes/users");
app.use("/user", userRoutes);

app.listen(3000, () => console.log("Server started"));
