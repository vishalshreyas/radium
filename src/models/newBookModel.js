const mongoose = require('mongoose')

const newBookSchema = new mongoose.Schema({
        name:{
            type:String,
            required: true,
            unique: true
        },

        author_id: {
            type:Number,
            required: true
        },
        price: Number,

        ratings:Number

}, {timestamps: true})

module.exports=mongoose.model('NewBookTwo',newBookSchema)