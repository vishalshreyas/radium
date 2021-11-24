const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: {
    type: Number, //mandatory property
    required: true,
  },
});

module.exports = mongoose.model("myProduct", productSchema);
