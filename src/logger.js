function log(name){
    console.log(name)
}

function welcome(){
    console.log('Welcome to my application, I am a student')
}

const url = 'http://www.google.com'

module.exports.loggingfunction = log // this is the way we can make a function public
module.exports.initialfunction = welcome
module.exports.endpoint = url