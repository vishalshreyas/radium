const objOne = require('./logger')
const objTwo = require('./util/helper')
const objThree = require('../validator/formatter')

objOne.loggingfunction('I am Vishal')
objOne.initialfunction()
console.log('This the url of google is ' +objOne.endpoint)
console.log('----------------------------------------------')
objTwo.currentDate()
objTwo.currentMonth()
objTwo.batchInfo()
console.log('----------------------------------------------')
const name = ' Vishal Shreyas '
const nameOne = 'ViShAl'
objThree.trimmer(name)
objThree.lowerCase(nameOne)
objThree.upperCase(nameOne)
console.log('----------------------------------------------')

const _ = require('underscore')

console.log(_.first(['Apple','Orange','Banana']))
console.log(_.last(['Apple','Orange','Banana']))

console.log('----------------------------------------------')

// console.log('This is my main file')

// const objOne = require('./jogger')

const lodash = require('lodash')

const months = ['January','February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']

console.log(lodash.chunk(months, 3))
console.log('----------------------------------------------')

const oddNum = [1,3,5,7,9,11,13,15,17,19]

console.log(lodash.tail(oddNum))
console.log('----------------------------------------------')

const arrOne = [1,2,3,4,5]
const arrTwo = [2,3,4,5,6]
const arrThree = [3,4,5,6,7]
const arrFour = [4,5,6,7,8]
const arrFive = [5,6,7,8,9]

console.log(lodash.union(arrOne,arrTwo,arrThree,arrFour,arrFive))
console.log('----------------------------------------------')

const objToBeMade = [['horror' , 'The Shining'],['drama', 'Titanic'],['thriller', 'Shutter Island'],['fantasy','Pans Labyrinth']]

console.log(lodash.fromPairs(objToBeMade))
console.log('----------------------------------------------')


