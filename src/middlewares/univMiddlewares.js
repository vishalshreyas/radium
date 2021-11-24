const jwt = require('jsonwebtoken')

const tokenCheck = function (req, res, next) {
  let token = req.headers["x-auth-token"];
  let validToken = jwt.verify(token, "mySecretKey");
  if (validToken) {
    req.validToken = validToken;
    next();
  } else {
    res.send({ status: false, msg: "Invalid Token" });
  }
};

module.exports.tokenCheck = tokenCheck