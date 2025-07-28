
const fs=require('fs')
const os = require('node:os');
function readFiles(){
    return fs.readFileSync("./Data.txt","utf-8")


}
function readSystemDetails(){
    
}
module.exports=readFiles
