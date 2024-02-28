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
  dataSync.syncDataToDatabase();
  // dataSync.updateContentFromApi();
});

// Konfigurisanje da server prima JSON
app.use(express.json());
app.use(cookieParser());
// Enable CORS for all routes
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Assuming frontend runs on port 5173
      "http://nginx-c:9999", // Assuming Nginx runs on port 9999
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

app.use("/uploads", express.static("uploads"));

// Routes, logic for endpoints
const newsRoutes = require("./routes/news");
app.use("/news", newsRoutes);

const userRoutes = require("./routes/users");
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  const headers = req.headers;
  res.status(200).send(headers);
});

app.listen(process.env.SERVER_PORT, () => console.log("Server started"));
