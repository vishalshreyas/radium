const mongoose = require("mongoose");


const testMiddle = function(req,res){
  res.send("It's working!")
}


module.exports.testMiddle = testMiddle;