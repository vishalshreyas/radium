const mongoose=require('mongoose')


// schema - definition of data - what will the data look like
// model - functionality (it enable us to create, view and modify data )

const authorSchema = new mongoose.Schema({

        author_id: {
            type:Number,
            required:true
        },

        author_name:String,

        age: Number,

        address:String

}, {timestamps: true})




module.exports=mongoose.model('Authors',authorSchema)