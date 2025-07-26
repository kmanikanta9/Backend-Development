const isPrime = require("./isPrime");

const arr=[2,10,17,21,29]
for(let i=0;i<arr.length;i++){
    if(isPrime(arr[i])){
        console.log(arr[i], "is a prime numner.")
    }
    else{
        console.log(arr[i], "is not a prime numner.")
    }
}
