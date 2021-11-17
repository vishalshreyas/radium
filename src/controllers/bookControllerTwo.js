const NewBookModel= require("../models/newBookModel")
const AuthorsModel= require("../models/authorsModel")
// const newBookModel = require("../models/newBookModel")


const createNewBookTwo= async function (req, res) {
    var data = req.body
    let savedDataOne= await NewBookModel.create(data)
    res.send({msg: savedDataOne})    
}
const createAuthor= async function (req, res) {
    var dataOne= req.body
    let savedDataTwo= await AuthorsModel.create(dataOne)
    res.send({msg: savedDataTwo})    
}
const chetanBhagat= async function (req,res){
    const bhagatBooks = await AuthorsModel.find({author_name:"Chetan Bhagat"})
    const authorId = bhagatBooks[0].author_id
    const bookName = await NewBookModel.find({"author_id":authorId})
    res.send(bookName)
}
const updatePrice= async function(req,res){
    const authorDet = await NewBookModel.findOne({name:"Two states"}).select({author_id:1})
    const authorIdOne = authorDet.author_id
    const updatePrice = await NewBookModel.findOneAndUpdate({"author_id":authorIdOne},{price:100},{new:true})
    const authorName = await AuthorsModel.findOne({"author_id":authorIdOne})
    const result ={"author_name":authorName.author_name,"price":updatePrice.price}
    // console.log(authorIdOne)
    // console.log(updatePrice) 
    res.send(result)
}
const particularPrice = async function(req,res){
    const authDet = await NewBookModel.find({price:{$gte:50,$lte:100}})
    let authName = []
    for(let i=0;i<authDet.length;i++){
        let authorID = authDet[i].author_id
        let resultOne = await AuthorsModel.findOne({"author_id":authorID})
        authName.push(resultOne.author_name)
    }
    // console.log(authDet)
    function onlyUnique(value,index,self){
        return self.indexOf(value)==index
    }
    let unique = authName.filter(onlyUnique)
    res.send(unique)
}
module.exports.createNewBookTwo = createNewBookTwo
module.exports.createAuthor = createAuthor
module.exports.chetanBhagat = chetanBhagat
module.exports.updatePrice = updatePrice
module.exports.particularPrice = particularPrice