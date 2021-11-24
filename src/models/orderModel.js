const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const purchaseOrderSchema = new mongoose.Schema({
  userId: ObjectId,
  productId: ObjectId,
  amount: Number,
  isFreeAppUser: Boolean,
  date: String,
});

module.exports = mongoose.model("myOrder", purchaseOrderSchema);
