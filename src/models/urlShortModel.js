const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema(
  {
    urlCode: { type: String, unique: true, lowercase: true, trim: true },
    longUrl: { type: String, required: "Long URL is required", trim: true },
    shortUrl: { type: String, required: "Short URL is required", unique: true },
  },
  { timestamps: true }
);

// urlSchema.path("longUrl").validate((val) => {
//   urlRegex =
//     /(ftp|http|https|HTTP|HTTPS):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
//   return urlRegex.test(val);
// }, "Invalid URL.");

module.exports = mongoose.model("Url", urlSchema);
