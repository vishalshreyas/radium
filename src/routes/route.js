const express = require('express');
const router = express.Router();


const UserModel= require("../models/userModel");
const BookModel= require("../models/bookModel");

const UserController= require("../controllers/userController");
const BookController= require("../controllers/bookController");
const BookControllerTwo = require("../controllers/bookControllerTwo")

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
//Day 0 ----------------------------------------
router.post('/createUser',  UserController.createUser  );
router.get('/getAllUsers',  UserController.getUsersData  );
router.post('/createBook', UserController.createBook);
router.get('/getAllBooks', UserController.getBooksData);

//Day 1 -----------------------------------------
router.post('/createNewBook',BookController.createNewBook);
router.get('/bookList',BookController.bookList);
router.get('/getBooksInYear',BookController.getBooksInYear);
router.get('/getParticularBooks',BookController.getParticularBooks);
router.get('/getXINRBooks',BookController.getXINRBooks);
router.get('/getRandomBooks',BookController.getRandomBooks);

//Day 2 -----------------------------------------
router.post('/createNewBookTwo', BookControllerTwo.createNewBookTwo);
router.post('/createAuthor', BookControllerTwo.createAuthor);
router.get('/chetanBhagat', BookControllerTwo.chetanBhagat);
router.get('/updatePrice', BookControllerTwo.updatePrice);
router.get('/particularPrice', BookControllerTwo.particularPrice);



module.exports = router;