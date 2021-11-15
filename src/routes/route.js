const express = require("express");

const router = express.Router();

router.get("/test-me/:index", function (req, res) {
  res.send("My first ever api!");
});
router.get("/movies", function (req, res) {
  res.send(["Tenet", "Inception", "Prestige", "Interstellar", "Oppenheimer"]);
});
router.get("/movies/:index", function (req, res) {
  const arr = ["Tenet", "Inception", "Prestige", "Interstellar", "Oppenheimer"];
  let value = req.params.index;
  value < arr.length ? res.send(arr[value]) : res.send("Enter a valid index");
});
router.get("/films", function (req, res) {
  const obj = [
    { id: 1, name: "The Shining" },
    { id: 2, name: "Incendies" },
    { id: 3, name: "Rang De Basanti" },
    { id: 4, name: "Finding Nemo" },
  ];
  res.send(obj);
});
router.get("/films/:filmId", function (req, res) {
  const obj = [
    { id: 1, name: "The Shining" },
    { id: 2, name: "Incendies" },
    { id: 3, name: "Rang De Basanti" },
    { id: 4, name: "Finding Nemo" },
  ];
  let x = req.params.filmId;
  let result = obj.filter((x) => x.id == (x || ""));
  result
    ? res.send(obj[valueOne - 1].name)
    : res.send("This ID does not exist. Enter a valid ID");
});
router.get("/find", function (req, res) {
  let arr = [1, 2, 3, 5, 6, 7];
  let sum = arr.reduce((a, b) => a + b);
  let lastDigit = arr.pop();
  let consecutiveSum = (lastDigit * (lastDigit + 1)) / 2;
  let diff = consecutiveSum - sum;

  if (sum != consecutiveSum) {
    res.send({ data: diff });
  }
});
router.get("/findany", function (req, res) {
  let arr = [1, 2, 3, 5, 6, 7];
  let len = arr.length;
  let sum = arr.reduce((a, b) => a + b);
  let firstDigit = arr[0];
  let lastDigit = arr.pop();
  let consecutiveSum = ((len + 1) * (lastDigit + firstDigit)) / 2;
  let diff = consecutiveSum - sum;

  if (sum != consecutiveSum) {
    res.send(`The missing number is ${diff}`);
  }
});
const spm = [
    {
      id: 1,
      name: "The Shining",
      rating: 8,
      director: "Stanley Kubrick",
      genre: "horror",
    },
    {
      id: 2,
      name: "Incendies",
      rating: 8,
      director: "Denis Villeneuve",
      genre: "mystery",
    },
    {
      id: 3,
      name: "Rang De Basanti",
      rating: 8,
      director: "Rakeysh Omprakash Mehra",
      genre: "drama",
    },
    {
      id: 4,
      name: "Finding Nemo",
      rating: 8,
      director: "Andrew Stanton",
      genre: "adventure",
    },
    {
      id: 5,
      name: "Jai Bhim",
      rating: 9,
      director: "TJ Gnanavel",
      genre: "mystery",
    },
    {
      id: 6,
      name: "MGR Magan",
      rating: 4,
      director: "Ponram",
      genre: "comedy",
    },
    {
      id: 7,
      name: "Free Guy",
      rating: 7,
      director: "Shawn Levy",
      genre: "action",
    },
    {
      id: 8,
      name: "The Vow",
      rating: 6,
      director: "Michael Sucsy",
      genre: "romance",
    },
  ];
router.get("/specific-movies", function (req, res) {
  
  const filters = req.query;
  const filteredUsers = spm.filter((movie) => {
    let isValid = true
    for(let i = 0; i< spm.length; i++){
        if(key in filters === key in movie) {
            for(key in filters){
                isValid = isValid && (movie[key] == filters[key])
            };
            return isValid;
        }else{
        res.send("Value doesn't exist")
    }
}
  });


  
});
router.post("/specific-movies",function(req,res){
    const add = req.body
    spm.push(add)
    res.send(spm)
})
router.get("/best-movie", function (req, res) {
    console.log(spm)
    const filteredUser = spm.find(movie => Math.max(movie.rating))
    res.send(filteredUser);
  });



module.exports = router;
