let mongoose = require("mongoose")
let connectToDb = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/bookRentalDB")
        console.log("Connected To Db")
    }catch(err){
        console.log('Error while connecting Db to node :',err.message)
    }
}
module.exports = connectToDb ; 