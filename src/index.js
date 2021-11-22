const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const globMiddleware = function (req,res,next){
    let dateToday = new Date()
    let dateNTime = dateToday.getDate() + " " 
                    + (dateToday.getMonth()+1)+ " "
                    + dateToday.getFullYear()+ " "
                    + dateToday.getHours()+ ":"
                    + dateToday.getMinutes()+ ":"
                    + dateToday.getSeconds()
        let ip = req.ip
        let url = req.originalUrl

        console.log(`${dateNTime}  ${ip}  ${url}`)
        
    next()
    
} 
app.use(globMiddleware);

const mongoose = require('mongoose');

mongoose.connect("mmongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/Vishal_Shreyas_TDB?retryWrites=true&w=majority")
    .then(() => console.log('mongodb running and connected'))
    .catch(err => console.log(err))



app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});