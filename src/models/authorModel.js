const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    author_name: String,
    age: Number,
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("myAuthor", authorSchema);
