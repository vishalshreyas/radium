const express = require('express');

const router = express.Router();

const controller = require('../controllers/controller')

router.post('/books', controller.createBook );
router.get('/books/:bookId', controller.getBookById)

module.exports = router;