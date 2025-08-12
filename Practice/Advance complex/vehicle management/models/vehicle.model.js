

const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
    startLocation:{type:String,required:true},
    endLocation:{type:String,required:true},
    distance:{type:Number,required:true, min:0},
    startTime:{type:Date},
    endTime:{type:Date}
})
const vehicleSchema = new mongoose.Schema({
    registrationNumber: {type:String,required:true,unique:true},
    type:{type:String,enum:['car','truck','bike'],required:true},
    model: {type:String,required:true},
    isActive: {type:Boolean,default:true},
    trips:[tripSchema]
})

const vehicleModel = mongoose.model("Vehicle",vehicleSchema)

module.exports = vehicleModel