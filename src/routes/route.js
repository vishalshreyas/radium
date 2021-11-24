const express = require('express');
const router = express.Router();

const testController= require("../controllers/testController");
const univMiddleware = require("../middlewares/univMiddleware")




//Assignment Middleware2

router.get('/testMiddle', testController.testMiddle);
router.post('/createProduct',testController.createProduct);     //productValidator
router.post('/createUser',univMiddleware.isFreeAppvalidator,testController.createUser);     //userValidator
router.post('/createOrder',univMiddleware.isFreeAppvalidator,testController.createOrder)
// router.post('/purchaseOrder',univMiddleware.isFreeAppvalidator,testController.purchaseOrder);
// purchase order
// 
//  If the isFreeApp header is true -->  1) the balance of the user is not deducted 
//                                       2) and the amount in order is set to 0 
//                                       3) as well the flag isFreeAppUser is set to true
// If this header has a false value -->  1) the product’s price is checked
//                                       2) This value is deducted from the user’s balance
//                                       3) and the order amount is set to the product’s price
//                                       4) as well as the flag isFreeAppUser is set to false in order document


module.exports = router;

