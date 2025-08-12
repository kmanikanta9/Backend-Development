

const express = require('express')
const vehicleModel = require('../models/vehicle.model')

const vehicleRouter = express.Router()

vehicleRouter.post('/add-vehicle',async(req,res)=>{
    try {
        let v = await vehicleModel.create(req.body)
        res.status(201).json({msg:"vehicle added",v})
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
})

module.exports = vehicleRouter