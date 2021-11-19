const express = require('express');
const router = express.Router();


const BookController= require("../controllers/bookController")


//Assignment RefPopulate
router.post('/authors',  BookController.author);
router.post('/createBook',  BookController.createBook  );
router.get('/getbooks',  BookController.getBooks  );
router.post('/publishers', BookController.createPublisher)




module.exports = router;