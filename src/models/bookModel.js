const mongoose=require('mongoose')


// schema - definition of data - what will the data look like
// model - functionality (it enable us to create, view and modify data )

const bookSchema = new mongoose.Schema({
    bookName: {
        type:String,
        unique: true,
        required:true
    },
    price: {

        indianPrice : String,
        europeanPrice : String
    },
    authorName:{
        type:String,
        required:true
    },
    tags: [String],
    totalPages: Number,   
    category: String,
    stockAvailable: Boolean,
    year: {
        type: Number,
        default: 2021
    },
    sales:{
        type:Number,
        default:0
    }, 

}, {timestamps: true})




module.exports=mongoose.model('NewBook',bookSchema)