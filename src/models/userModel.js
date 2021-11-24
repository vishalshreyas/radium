const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  balance: {
    type: Number, // Default balance at user registration is 100
    default: 100,
  },
  address: String,
  age: Number,
  gender: {
    type: String, // Allowed values are - “male”, “female”, “other”
    enum: ["male", "female", "others"],
  },
  freeAppUser: {
    type: Boolean, // Default false value
    default: false,
  },
});

module.exports = mongoose.model("myUser", userSchema);
