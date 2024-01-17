const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
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
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//Creating one
router.post("/", async (req, res) => {
  if (req.body.Password != req.body.PasswordConfirmation) {
    return res.status(400).json({ message: "Sifra se ne podudara" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.Password, salt);

  const user = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: hashedPassword,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
  }
  if (req.body.Password != null) {
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

module.exports = router;
