require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const mongoose = require("mongoose");
const dataSync = require("./dataSync");
const cookieParser = require("cookie-parser");

// Povezivanje sa bazom
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => {
  console.log("Connected to Database");
  // dataSync.syncDataToDatabase();
  // dataSync.updateContentFromApi();
});

// Konfigurisanje da server prima JSON
app.use(express.json());
app.use(cookieParser());
// Enable CORS for all routes

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

// Routes, logic for endpoints
const newsRoutes = require("./routes/news");
app.use("/news", newsRoutes);

const userRoutes = require("./routes/users");
app.use("/user", userRoutes);

app.listen(3000, () => console.log("Server started"));
