const isFreeAppvalidator = function (req, res, next) {
  let freeAppCheck = req.headers["isfreeapp"];
  if (freeAppCheck) {
    if (freeAppCheck === "true") {
      freeAppCheck = true;
    } else {
      freeAppCheck = false;
    }
    req.isFreeAppUser = freeAppCheck;
    next();
  } else {
    res.send("Missing a Mandatory Header");
  }
};

module.exports.isFreeAppvalidator = isFreeAppvalidator;

// nike(150) - 619db9226a8d23f6707eca32 shirt(50) - 619db96157ed5e556652fd09
// brush (10)- 619db9a08c230c650a6ef43d

// vishal(10) - 619dba7cef331b40158a6ddf, shreyas(200) - 619dbac4fa01359084831bf5
// tay(100) - 619dbb0af99c8d5a93de85be