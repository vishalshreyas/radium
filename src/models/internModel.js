const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}
let validateMobile = function(v) {
    let re = /^[0-9]\d{9}$/gi;        
    return re.test(v);
    }


const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "name is required",
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    mobile: {
        type: String,
        trim: true,
        required : true,
        unique:true,
        validate: [validateMobile, 'Please fill a valid Mobile Number'],
        match: [ /^[0-9]\d{9}$/gi, 'Please fill a valid Mobile Number']
    },
    collegeId: {
        type: ObjectId,
        ref: 'college'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
module.exports = mongoose.model('intern', internSchema)