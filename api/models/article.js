const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Corrected from 'require' to 'required'
  },
  description: {
    type: String,
    required: true, // Corrected from 'require' to 'required'
  },
});

module.exports = mongoose.model("Article", articleSchema);
