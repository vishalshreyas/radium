const urlModel = require("../models/urlShortModel");
const shortId = require("shortid");
const { response } = require("express");

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
      return res.status(400).send({
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

    if (
      !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
        longUrl
      )
    ) {
      return res.status(400).send({
        status: false,
        message: "Invalid URL. Please provide correct URL",
      });
    }
    if (!/(.com|.org|.co.in|.in|.co|.us)/.test(longUrl)) {
      return res.send("Url is not valid");
    }
    const urlTrim = longUrl.trim();
    const urlval = urlTrim
      .split("")
      .map((a) => a.trim())
      .join("");

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
    let checkUrlCode = await urlModel.findOne({ urlCode: urlCode });
    // const urlCode = shortId.generate();
    if (checkUrlCode) {
      urlCode = makeid(9);
    }

    const shortUrl = `http://localhost:3000/${urlCode}`;
    const data = {};
    data["longUrl"] = urlval;
    data["shortUrl"] = shortUrl;
    data["urlCode"] = urlCode;

    let cachedUrlData = await GET_ASYNC(`${data.longUrl}`);
    if (cachedUrlData) {
      res.send(cachedUrlData);
    } else {
      let profile = await urlModel.create(data);
      await SET_ASYNC(`${data}`, JSON.stringify(profile));
      res.status(201).send({ data: profile });
    }
    // const response = await urlModel.create(data);

    // res.status(201).send({ status: true, data: response });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Some error occured" });
  }
};

const redirectUrl = async function (req, res) {
  try {
    const urlData = req.params.urlCode;

    const urlDataTwo = urlData
      .split("")
      .map((a) => a.trim())
      .join("");

    let cachedUrlDataTwo = await GET_ASYNC(`${urlDataTwo}`);

    if (cachedUrlDataTwo) {
      res.redirect(307, cachedUrlDataTwo.longUrl);
    } else {
      let validData = await urlModel
        .findOne({ urlCode: urlDataTwo })
        .select({ longUrl: 1 });

      if (!validData) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide a valid URL Code" });
      }

      await SET_ASYNC(`${validData}`, JSON.stringify(profile));
      res.redirect(307, validData.longUrl);
    }
    // const validData = await urlModel
    //   .findOne({ urlCode: urlDataTwo })
    //   .select({ longUrl: 1 });

    // if (!validData) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "Please provide a valid URL Code" });
    // }

    // res.redirect(307, validData.longUrl);
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.shortenUrl = shortenUrl;
module.exports.redirectUrl = redirectUrl;
