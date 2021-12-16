const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is Required'},
  author:{type: String, required: 'Author is Required'},
  category:{type: String, required: 'Category is Required'},
});

module.exports = mongoose.model("myBookNew", bookSchema);