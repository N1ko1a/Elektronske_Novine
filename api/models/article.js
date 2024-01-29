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
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
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
