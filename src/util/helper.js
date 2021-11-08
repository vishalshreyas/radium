function printDate(){
    console.log('09/11/2021')
}

function printMonth(){
    console.log('November')
}

function getBatchInfo(){
    console.log('Batch Name: Radium, Week#: 4, Day#: 1, Topic: Node.js')
}

module.exports.currentDate = printDate
module.exports.currentMonth = printMonth
module.exports.batchInfo = getBatchInfo