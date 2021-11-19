const bookModel = require("../models/bookModel.js");
const authorModel = require("../models/authorModel");
const mongoose = require("mongoose");
const publisherModel = require("../models/publisherModel.js");

const author = async function (req, res) {
  const book = req.body;
  let savedBook = await authorModel.create(book);
  res.send({ data: savedBook });
};
const createBook = async function (req, res) {
  const book = req.body;
  let authorId = req.body.author;
  let publisherId = req.body.publisher;
  if (authorId != 0 && publisherId != 0) {
    let authorMatched = await authorModel.findById(authorId);
    let publisherMatched = await publisherModel.findById(publisherId);
    if (authorId && publisherId && authorMatched && publisherMatched) {
      let savedBook = await bookModel.create(book);
      res.send({ data: savedBook });
    } else {
      res.send(
        "Publisher ID or Author ID incorrect. Please check the Author ID and Publisher ID "
      );
    }
  } else {
    res.send(
      "Publisher ID or Author ID missing. Please check the Author ID and Publisher ID "
    );
  }
};
const createPublisher = async function (req, res) {
  const publisher = req.body;
  let savedPublisher = await publisherModel.create(publisher);
  res.send({ data: savedPublisher });
};
// three mistakes, five point - rupa publication(new delhi) --> 619652c0b3b865f067ee2d5f, one arranged murder - westland(chennai) ---> 619652f1b3b865f067ee2d61,
// hpcs,gof,hbp - Bloomsbury(london) --> 6196532cb3b865f067ee2d63

const getBooks = async function (req, res) {
  let allBooks = await bookModel
    .find()
    .populate({ path: "author", select: { _id: 1, author_name: 1, age: 1 } })
    .populate("publisher");
  res.send({ data: allBooks });
};

// chetan bhagat --> 61961c92f290789e870636e4, J K Rowling --> 61961cc8f290789e870636e6

module.exports.createBook = createBook;
module.exports.createPublisher = createPublisher;
module.exports.getBooks = getBooks;
module.exports.author = author;
