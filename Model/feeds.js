const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
  author: String,
  title: String,
  body: String,
  date: { type: Date, default: Date.now },
  votes: Number,
  showComment: { type: Boolean, default: false },
  replies: [{ 
    author: String, 
    comment: String, 
    date: { type: Date, default: Date.now } 
  }]
});

module.exports = mongoose.model("Feed", feedSchema);
