const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    require: true,
  },
  LastName: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  Password: {
    type: String,
    required: true,
    minLength: 6,
  },
  PasswordConfirmation: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", userSchema);
