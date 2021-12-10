const axios = require("axios");
const cryptoModel = require("../models/cryptomodel");
const capCoinModel = require("../models/capCoinModel")

// res.status(200). send( { data: userDetails } )

const getStatesList = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
    };
    const cowinStates = await axios(options);

    console.log("WORKING");
    let states = cowinStates.data;
    res.status(200).send({ msg: "Successfully fetched data", data: states });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Some error occured" });
  }
};

const getDistrictsList = async function (req, res) {
  try {
    let id = req.params.stateId;
    console.log(" state: ", id);

    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`, //plz take 5 mins to revise template literals here
    };
    let response = await axios(options);

    let districts = response.data;

    console.log(response.data);
    res.status(200).send({ msg: "Success", data: districts });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Something went wrong" });
  }
};

const getByPin = async function (req, res) {
  try {
    let pin = req.query.pincode;
    let date = req.query.date;

    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`,
    };
    let response = await axios(options);

    let centers = response.data;
    console.log(centers);
    res.status(200).send({ msg: "Success", data: centers });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Something went wrong" });
  }
};

const getOtp = async function (req, res) {
  try {
    let options = {
      method: "post", // method has to be post
      url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
      data: { mobile: req.body.mobile }, // we are sending the json body in the data
    };
    let response = await axios(options);

    let id = response.data;
    res.status(200).send({ msg: "Success", data: id });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Something went wrong" });
  }
};

const getTemp = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=45bd408d5c5c7cb51f0e7c1b445d1991`,
    };
    let response = await axios(options);
    let temperature = response.data.main.temp;
    let city = response.data.name;
    // console.log(response)
    res.status(200).send({ msg: "Success", city: city, temp: temperature });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Something went wrong" });
  }
};

const getTempCity = async function (req, res) {
  try {
    let arr = [
      "Bengaluru",
      "Mumbai",
      "Delhi",
      "Kolkata",
      "Chennai",
      "London",
      "Moscow",
    ];
    let arr1 = [];
    for (let i of arr) {
      let options = {
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${i}&appid=45bd408d5c5c7cb51f0e7c1b445d1991`,
      };

      let response = await axios(options);
      let temperature = response.data.main.temp;
      let city = response.data.name;
      arr1.push({ city: city, temp: temperature });
    }
    const response = arr1.sort((a, b) => (a.temp > b.temp ? 1 : -1));

    res.send({ data: response });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Something went wrong" });
  }
};

const assets = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "http://api.coincap.io/v2/assets",
      headers: { Authorization: "Bearer a6cc164c-1026-47f5-9f0d-7b8fb8245b18" },
    };

    let response = await axios(options);
    let id = response.data.data;
    let ID = id.sort((a, b) =>a.changePercent24Hr > b.changePercent24Hr ? 1 : -1);
    for (let i = 0; i < ID.length; i++) {
      const { symbol, name, marketCapUsd, priceUsd } = ID[i];
      let data = {
        symbol: symbol,
        name: name,
        marketCapUsd: marketCapUsd,
        priceUsd: priceUsd,
      };
      await cryptoModel.create(data);
    }
    let allData = await cryptoModel.find();
    res.send(allData);
  } catch {
    res.status(500).send("Something went wrong");
  }
};

module.exports.getStatesList = getStatesList;
module.exports.getDistrictsList = getDistrictsList;
module.exports.getByPin = getByPin;
module.exports.getOtp = getOtp;
module.exports.getTemp = getTemp;
module.exports.getTempCity = getTempCity;
module.exports.assets = assets;

