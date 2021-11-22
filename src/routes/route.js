const express = require('express');
const router = express.Router();

const testController= require("../controllers/bookController");





//Assignment Middleware

router.get('/testMiddle', testController.testMiddle);



module.exports = router;
