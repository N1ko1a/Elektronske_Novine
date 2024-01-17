require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { syncDataToDatabase } = require("./dataSync");
//Povezivanje sa bazom
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
// syncDataToDatabase();
//Konfigurisanje da server prima JASON
app.use(express.json());

//Routes, logic for endpoints
const newsRoutes = require("./routes/news");
//Moramo da kazemo aplikaciji da hocemo da koristimo ovaj route
//localhost:3000/news/bilo_sta_posle
app.use("/news", newsRoutes);

app.listen(3000, () => console.log("Server started"));
