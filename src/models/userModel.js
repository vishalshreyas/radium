const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: {
        type: String,
        unique: true,   //schema level validation
        required: true  //schema level validation
    },
    emailId: String, 
    gender: {type: String, enum: ['male', 'female', 'LGBTQ']}, // falana will give an error 
    age: Number,

    // isIndian: Boolean,
    // parentsInfo : { motherName: String, fatherName: String , siblingName: String },
    // cars: [ String ]

}, {timestamps: true} )
// schema - definition of data - what will the data look like
// model - functionality (it enable us to create, view and modify data )

const bookSchema = new mongoose.Schema({
    bookName: {
        type:String,
        unique: true,
        required:true
    },
    authorName:{
        type:String,
        required:true
    },    
    category: String,
    year: Number
}, {timestamps: true})



module.exports=mongoose.model('User',userSchema)
module.exports=mongoose.model('Book',bookSchema)

// String, Number
// Boolean, Object/json, array