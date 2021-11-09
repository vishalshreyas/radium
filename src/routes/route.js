const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.get('/movies', function (req,res) {
    res.send(['Tenet','Inception','Prestige','Interstellar','Oppenheimer'])
});
router.get('/movies/:index', function (req,res) {
    const arr = ['Tenet','Inception','Prestige','Interstellar','Oppenheimer']
    let value = req.params.index
     value < arr.length ? res.send(arr[value]):res.send('Enter a valid index')
    
});
router.get('/films', function (req,res){
    const obj = [{"id":1, "name":"The Shining"},{"id":2,"name":"Incendies"},{"id":3,"name":"Rang De Basanti"},{"id":4,"name":"Finding Nemo"}]
    res.send(obj)
});
router.get('/films/:filmId', function (req,res){
    const obj = [{"id":1, "name":"The Shining"},{"id":2,"name":"Incendies"},{"id":3,"name":"Rang De Basanti"},{"id":4,"name":"Finding Nemo"}]
    let valueOne = req.params.filmId
    let len = valueOne -1
    let result = len < obj.length && len!= (0 || -1)
    result ? res.send(obj[valueOne-1].name) : res.send('This ID does not exist. Enter a valid ID')
})


module.exports = router;