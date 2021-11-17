const UserModel= require("../models/userModel.js")

const createUser= async function (req, res) {
    var data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})    
}


const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

const createBook= async function (req, res) {
    var data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})    
}

const getBooksData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
module.exports.createBook= createBook
module.exports.getBooksData = getBooksData