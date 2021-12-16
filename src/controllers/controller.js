const mongoose = require("mongoose");
const bookModel = require("../models/bookModel");

const redis = require("redis");

const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
  12845,
  "redis-12845.c10.us-east-1-3.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("Xq0rqlRVXkNbnWcLZHDtABWmqMFxKhjv", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});

//1. connect to the server
//2. use the commands :

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);


const createBook = async function (req, res) {
    let bookData = req.body;
    const savedBookData = await bookModel.create(bookData);
    res.send({ data: savedBookData });
  };

const getBookById = async function(req,res){
    
    
    let bookId = req.params.bookId
    let cachedBookData = await GET_ASYNC(`${bookId}`);
    let cachedObj = JSON.parse(cachedBookData)
    
    if(cachedObj){
    let checkObj ={}
    if(bookId === cachedObj._id){
        value = value + 1
        checkObj[`${bookId}`] = value
    }
    console.log(checkObj)
    if(checkObj[`${bookId}`] < 5){
    if (cachedObj) {
      return res.send(cachedObj);
    }else{
        return res.status(429).send({ message: "Too many requests. Limit exceeded"})
    }}
}
    value = 0
    const fetchBook = await bookModel.findById({_id: bookId})
    await SET_ASYNC(`${bookId}`, JSON.stringify(fetchBook));
    return res.status(201).send({ data: fetchBook});
    
    
    
}

module.exports = {createBook, getBookById}