const urlModel = require("../models/urlShortModel");
const shortId = require("shortid");
const { response } = require("express");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const shortenUrl = async function (req, res) {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Invalid request parameters. Please provide URL details",
        });
    }

    let longUrl = req.body.longUrl;

    if (!isValid(longUrl)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide Long URL" });
    }

        
        // const len = urlval.length       
        // if (len > 1) {
        //     return res.status(400).send({ status: false, msg: "URL cannot have space inbetween" });
        // }

    if(!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(longUrl)){
      return res
        .status(400)
        .send({
          status: false,
          message: "Invalid URL. Please provide correct URL",
        });
    }

      const urlTrim = longUrl.trim()
        const urlval = urlTrim.split("").map(a => a.trim()).join("");
      

    const alreadyRegisteredUrlCode = await urlModel.findOne({
      longUrl: urlval,
    });

    if (alreadyRegisteredUrlCode) {
      return res
        .status(201)
        .send({
          status: true,
          data: alreadyRegisteredUrlCode,
        });
    }

    function makeid(length) {
      var result = "";
      var characters = "abcdefghijklmnopqrstuvwxyz";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    let urlCode = makeid(9);
    // const urlCode = shortId.generate();

    const shortUrl = `http://localhost:3000/${urlCode}`;
    const data = {};
    data["longUrl"] = urlval;
    data["shortUrl"] = shortUrl;
    data["urlCode"] = urlCode;
    const response = await urlModel.create(data);

    res.status(201).send({ status: true, data: response });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Some error occured" });
  }
};

const redirectUrl = async function (req, res) {
  try {
    const urlData = req.params.urlCode;

    const urlDataTwo = urlData.split("").map(a => a.trim()).join("");

    const validData = await urlModel
      .findOne({ urlCode: urlDataTwo })
      .select({ longUrl: 1 });

    if (!validData) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid URL Code" });
    }

    res.redirect(307, validData.longUrl);
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.shortenUrl = shortenUrl;
module.exports.redirectUrl = redirectUrl;
