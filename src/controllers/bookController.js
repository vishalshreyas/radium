const BookModel= require("../models/bookModel")



const createNewBook= async function (req, res) {
    var data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})    
}
const bookList = async function (req, res) {
    const books = await BookModel.find().select({ bookName: 1, authorName: 1})
    res.send({books})
}
const getBooksInYear = async function(req,res){
    const yearBooks = await BookModel.find({year: req.body.year})
    res.send(yearBooks)
}
const getParticularBooks = async function(req,res){
    const cond = await BookModel.find(req.body)
    res.send(cond)
}
const getXINRBooks = async function (req,res){
    const xinr = await BookModel.find({"price.indianPrice":{ $in: ["100 INR","200 INR","500 INR"]}})
    res.send(xinr)
}
const getRandomBooks = async function (req,res){
    const rand = await BookModel.find({$or:[{stockAvailable:true},{totalPages:{$gt:500}}]})
    res.send(rand)
}

module.exports.createNewBook= createNewBook
module.exports.bookList= bookList
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks
