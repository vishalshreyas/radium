const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema(
  {
    publisher_name: String,
    headQuarters: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("myPublisher", publisherSchema);
