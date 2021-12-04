const mongoose = require("mongoose");
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestbody) {
  return Object.keys(requestbody).length > 0;
};



const createColleges = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!isValid(requestBody)) {
      res
        .status(400)
        .send({
          status: false,
          msg: "Invalid request parameters. Please provide College Details",
        });
        return
    }
    //Extract Params
    const { name, fullName, logoLink, isDeleted } = requestBody;

    //Validation Starts
    if (!isValid(name)) {
      res.status(400).send({ status: false, msg: "College name is required" });
      return;
    }
    if (!isValid(fullName)) {
      res
        .status(400)
        .send({ status: false, msg: "College Fullname is required" });
      return;
    }
    if (!isValid(logoLink)) {
      res
        .status(400)
        .send({ status: false, msg: "College Logo link is required" });
      return;
    }
    if (isDeleted == true) {
      res
        .status(400)
        .send({ status: false, msg: "Cannot input isDeleted as true while registering" });
      return;
    }
    //Validation Ends
    const newCollege = await collegeModel.create(requestBody);
    res
      .status(201)
      .send({
        status: true,
        msg: "New College created successfully",
        data: newCollege,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.message });
  }
};

const getCollegeDetails = async function(req,res){
  try{
      const filterQuery = {isDeleted :false  }
      const queryParam = req.query
    if(!isValidRequestBody(queryParam)){
      res
        .status(400)
        .send({ status: false, msg: "No query param received" });
      return;
    }
    
      const name1 = req.query.collegeName
      if(isValid(name1)){
        filterQuery['name'] = name1
      }
    
      const college = await collegeModel.findOne(filterQuery)
      console.log(college)
      if(!college){
        res
        .status(400)
        .send({ status: false, msg: "Either college details doesn't exist or Incorrect College name" });
      return;
      }
      const interns = await internModel.find({collegeId: college._id}).select({isDeleted:0, collegeId:0})
      
      if(interns.length === 0){
        res
        .status(400)
        .send({ status: false, msg: "Interns details doesn't exist" });
      return;
      }
      
      const {name, fullName, logoLink} = college
      const response = {
        name: name, fullName: fullName, logoLink: logoLink
      }
      
      if(isValid(interns)){
        response['interests'] = interns
      }
      
      res.status(201).send({status: true,data: response});

  }catch(error){
    console.log(error);
    res.status(500).send({ status: false, message: error.message });
  }
  
}

module.exports = {createColleges, getCollegeDetails}