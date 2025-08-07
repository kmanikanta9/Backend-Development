let mongoose = require("mongoose");

let tripSchema = new mongoose.Schema({
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  distance: { type: Number, min: 1 },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

let vehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ["car", "truck", "bike"], required: true },
  model: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  trips: [tripSchema],
});

let vehicleModel = mongoose.model("Vehicles", vehicleSchema);

module.exports = vehicleModel;
