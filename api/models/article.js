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
    type: [String], // Array of user IDs who liked the comment
    default: [],
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
  approved: {
    type: Boolean,
    default: false, // Početno stanje: članak nije odobren
  },
  like: {
    type: [String], // Array of user IDs who liked the comment
    default: [],
  },
  dislike: {
    type: [String], // Array of user IDs who disliked the comment
    default: [],
  },
  comments: [
    {
      user: {
        type: String,
      },
      content: {
        type: String,
      },
      like: {
        type: [String], // Array of user IDs who liked the comment
        default: [],
      },
      dislike: {
        type: [String], // Array of user IDs who disliked the comment
        default: [],
      },
    },
  ],
});

module.exports = mongoose.model("Article", articleSchema);
