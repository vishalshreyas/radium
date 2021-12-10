const express = require('express');
const router = express.Router();

const urlController= require("../controllers/urlcontroller")


router.post("/url/shorten",urlController.shortenUrl )
router.get("/:urlCode",urlController.redirectUrl)

module.exports = router;