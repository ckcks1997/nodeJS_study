const {odd, even} = require('./var');

function checkOddEven(num){
    if(num % 2)
    return odd;
    else return even;
}

module.exports = checkOddEven;