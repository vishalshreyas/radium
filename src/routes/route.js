const express = require('express');
const router = express.Router();

const userController= require("../controllers/bookController");
const middleWare = require('../middlewares/univMiddlewares')





//Assignment

router.post('/users', userController.registerUser);
router.post('/login', userController.login);
router.get('/users/:userId',middleWare.tokenCheck, userController.getDetails);
router.put('/users/:userId',middleWare.tokenCheck,userController.updateDetails)



module.exports = router;
