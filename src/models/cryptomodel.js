const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
    symbol:{
        type: String,
        unique: true
    }, 
    name:{ type: String, unique:true },
    marketCapUsd: String,
    priceUsd: String
});

module.exports = mongoose.model("Crypto", cryptoSchema);

// {

//     "symbol" // String and Unqiue
    
//             "name": // String and Unqiue
    
//                 "marketCapUsd": // String  ( not Number)
    
//                     "priceUsd": //String
    
//     }