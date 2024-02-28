const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtMid = require("../middlewarw/authenticated");

//get all
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get one
router.get("/:id", jwtMid.formHandler, getUser, (req, res) => {
  // Check if the authenticated user has the same ID as the requested user
  if (req.user.userId !== req.params.id) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  res.json(res.user);
});

//Registracija
router.post("/", async (req, res) => {
  //Validacija
  if (
    !req.body.Email ||
    !req.body.Password ||
    !req.body.FirstName ||
    !req.body.LastName ||
    !req.body.PasswordConfirmation
  ) {
    return res.status(400).json({ message: "Sva polja moraju biti popunjena" });
  }
  if (!validator.isEmail(req.body.Email)) {
    return res.status(400).json({ message: "Neispravan email" });
  }
  if (!validator.isStrongPassword(req.body.Password)) {
    return res.status(400).json({ message: "Sifra nije dovoljno jaka" });
  }
  if (req.body.Password != req.body.PasswordConfirmation) {
    return res.status(400).json({ message: "Sifra se ne podudara" });
  }
  //Enkripcija sifre
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.Password, salt);

  const isAdmin = req.body.AdminCode === process.env.ADMIN_SECRET;

  const user = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: hashedPassword,
    isAdmin,
  });
  try {
    const newUser = await user.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.MY_SECRET, {
      expiresIn: "1m",
    });
    // Postavljanje HTTP-only kolačića
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, //mora da bude stranica https
      maxAge: 3600000,
    });
    // Slanje informacije o dostupnosti tokena u JSON odgovoru
    res.json({
      authenticated: true,
      message: "uspesan token poslat",
      tokenAvailable: true,
      userName: newUser.FirstName,
      isAdmin: newUser.isAdmin,
      _id: newUser._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, tokenAvailable: false });
  }
});

//Updating one
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.FirstName != null) {
    res.user.FirstName = req.body.FirstName;
  }
  if (req.body.LastName != null) {
    res.user.LastName = req.body.LastName;
  }
  if (req.body.Email != null) {
    res.user.Email = req.body.Email;
    const existingUser = await User.findOne({ Email: req.body.Email });
    if (existingUser && existingUser._id.toString() !== req.body.id) {
      return res.status(400).json({ message: "Email vec postoji" });
    }
    if (!validator.isEmail(req.body.Email)) {
      return res.status(400).json({ message: "Neispravan email" });
    }
  }
  if (req.body.Password != null) {
    if (!validator.isStrongPassword(req.body.Password)) {
      return res.status(400).json({ message: "Sifra nije dovoljno jaka" });
    }
    if (req.body.Password !== req.body.PasswordConfirmation) {
      return res.status(400).json({ message: "Šifra se ne podudara" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);
    res.user.Password = hashedPassword;
  }
  try {
    const updateUser = await res.user.save();
    res.json(updateUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Deleting one
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed!", tokenAvailable: false });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.Password,
      user.Password,
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Authentication failed!", tokenAvailable: false });
    }
    const token = jwt.sign({ userId: user._id }, process.env.MY_SECRET, {
      expiresIn: "1m",
    });
    // Postavljanje HTTP-only kolačića
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, //mora da bude stranica https
      maxAge: 3600000,
    });
    // Slanje informacije o dostupnosti tokena u JSON odgovoru
    res.json({
      authenticated: true,
      message: "uspesan token poslat",
      tokenAvailable: true,
      userName: user.FirstName,
      isAdmin: user.isAdmin,
      _id: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, tokenAvailable: false });
  }
});

// Dodajte ovaj deo koda gde definišete rute na svom serveru
router.post("/logout", (req, res) => {
  // Ovde obrišite HTTP-only kolačić
  res.clearCookie("jwt");
  res.json({
    authenticated: true,
    message: "Token uspesno obrisan",
    tokenAvailable: false,
  });
});
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

// function cookieJwtAuth(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);
//
//   jwt.verify(token, process.env.MY_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

module.exports = router;
