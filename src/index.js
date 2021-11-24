const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const globMiddleware = function (req,res,next){
//     let dateToday = new Date()
//     let dateNTime = dateToday.getDate() + " " 
//                     + (dateToday.getMonth()+1)+ " "
//                     + dateToday.getFullYear()+ " "
//                     + dateToday.getHours()+ ":"
//                     + dateToday.getMinutes()+ ":"
//                     + dateToday.getSeconds()
//         let ip = req.ip
//         let url = req.originalUrl

//         console.log(`${dateNTime}  ${ip}  ${url}`)
        
//     next()
    
// } 
// app.use(globMiddleware);

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://monty-python:SnYUEY4giV9rekw@functionup-backend-coho.0zpfv.mongodb.net/VishalShreyas_db?authSource=admin&replicaSet=atlas-60843q-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")
    .then(() => console.log('mongodb running and connected'))
    .catch(err => console.log(err))



app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});