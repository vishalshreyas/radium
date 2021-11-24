const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");

const registerUser = async function (req, res) {
  let data = req.body;
  const savedData = await userModel.create(data);
  res.send({ data: savedData });
};

const login = async function (req, res) {
  let credentials = req.body;
  let username = await userModel.findOne({ name: credentials.name });
  let password = await userModel.findOne({ password: credentials.password });
  if (!username || !password) {
    res.send({ status: false, msg: "Invalid Username or Password " });
  } else if (username && password && req.body.isDeleted) {
    res.send({ status: false, msg: "User doesn't exist" });
  } else {
    let payload = { _id: username._id };
    const validToken = jwt.sign(payload, "mySecretKey");
    res.header("x-auth-token", validToken);
    res.send({ status: true, data: username, token: validToken });
  }
};

const getDetails = async function (req, res) {
  let userId = req.params.userId;
  if (req.validToken._id === userId) {
    let userDetails = await userModel.findById(userId);
    if (!userDetails && userDetails.isDeleted) {
      res.send({ status: false, msg: "Invalid User" });
    } else {
      res.send({ status: true, msg: userDetails });
    }
  } else {
    res.send({ status: false, msg: "Not Authorised" });
  }
};
const updateDetails = async function (req, res) {
  let userId = req.params.userId;
  if (req.validToken._id === userId) {
    let newEmail = req.body.email;
    let updateDet = await userModel.findOneAndUpdate(
      { _id: userId },
      { email: newEmail },
      { new: true }
    );
    res.send({ status: true, data: updateDet });
  } else {
    res.send({ status: false, msg: "Not Authorised" });
  }
};

module.exports.registerUser = registerUser;
module.exports.login = login;
module.exports.getDetails = getDetails;
module.exports.updateDetails = updateDetails;
