function trimOne(word){
    console.log(word.trim())
}

function changeToLowerCase(str){
    console.log(str.toLowerCase())
}

function changeToUpperCase(strTwo){
    console.log(strTwo.toUpperCase())
}

module.exports.trimmer = trimOne
module.exports.upperCase = changeToUpperCase
module.exports.lowerCase = changeToLowerCase