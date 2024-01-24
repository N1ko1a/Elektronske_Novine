const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  url: {
    type: String,
  },
  source: {
    type: String,
  },
  author: {
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("Article", articleSchema);
