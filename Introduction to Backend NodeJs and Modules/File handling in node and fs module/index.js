const { readFileData, appendFileData } = require("./fileOperation")

console.log("Initial File Content:")
console.log(readFileData())
console.log("Appending data...")
console.log("Updated File Content:")
console.log(readFileData())
console.log(appendFileData())
console.log("This is Appended data")