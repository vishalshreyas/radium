const mongoose = require("mongoose");
const ProductModel = require("../models/productModel");
const UserModel = require("../models/userModel");
const OrderModel = require("../models/orderModel");

const testMiddle = function (req, res) {
  res.send("It's working!");
};

const createProduct = async function (req, res) {
  let proddata = req.body;
  const savedProdData = await ProductModel.create(proddata);
  res.send({ data: savedProdData });
};

const createUser = async function (req, res) {
  let userdata = req.body;
  userdata.freeAppUser = req.isFreeAppUser;
  const saveUserData = await UserModel.create(userdata);
  res.send({ data: saveUserData });
};
const createOrder = async function (req, res) {
  let orderdata = req.body;
  let user = await UserModel.findById(orderdata.userId);
  if (!user) {
    res.send({ msg: "User doesn't exist. Please check the UserID" });
  }
  let product = await ProductModel.findById(orderdata.productId);
  if (!product) {
    res.send({ msg: "Product doesn't exist. Please check the ProductID" });
  }
  let isFreeApp = req.isFreeAppUser;
  let orderAmount;
  if (isFreeApp) {
    orderAmount = 0;
  } else if (!isFreeApp && user.balance >= product.price) {
    orderAmount = product.price;
    await UserModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(orderdata.userId) },
      { balance: user.balance - product.price }
    );
  } else {
    res.send({ msg: "Insufficient balance. Order cannot be processed." });
  }

  orderdata.amount = orderAmount;
  orderdata.isFreeAppUser = isFreeApp;
  orderdata.date = Date();

  let ordercreated = await OrderModel.create(orderdata);
};
module.exports.testMiddle = testMiddle;
module.exports.createProduct = createProduct;
module.exports.createUser = createUser;
module.exports.createOrder = createOrder;

