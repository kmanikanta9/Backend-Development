const vehicleModel = require("../models/vehicleModel");

let addNewVehicle = async (req, res) => {
  try {
    let newVehicle = req.body;
    await vehicleModel.create(newVehicle);
    res.status(200).json({ message: "Vehicle Added Successfully..." });
  } catch (error) {
    console.log("Error While Adding New Vehicle :", error.message);
    res.status(500).json({ message: error.message });
  }
};

let addTripToVehicleByVehicleId = async (req, res) => {
  try {
    let id = req.params.id;
    let newTrip = req.body;
    let vehicle = await vehicleModel.findById({ _id: id });
    if (!vehicle) {
      return res.status(405).json({ message: "Vehicle Not Found.." });
    }
    vehicle.trips.push(newTrip);
    await vehicle.save();
    res.status(200).json({ message: "Trip Added Successfully..." });
  } catch (error) {
    console.log("Error While Adding trip to  Vehicle :", error.message);
    res.status(500).json({ message: error.message });
  }
};

let getAllVehicles = async (req, res) => {
  try {
    let allVehicles = await vehicleModel.find();
    res.status(200).json({ message: "Vehicles", vehicles: allVehicles });
  } catch (error) {
    console.log("Error While getting all Vehicle :", error.message);
    res.status(500).json({ message: error.message });
  }
};

let getVehicleById = async (req, res) => {
  try {
    let id = req.params.id;
    let vehicle = await vehicleModel.findById({ _id: id });
    if (!vehicle) {
      return res.status(405).json({ message: "Vehicle Not Found.." });
    }
    res.status(200).json({ message: "Vehicle Found", vehicle });
  } catch (error) {
    console.log("Error While getting vehicle by id:", error.message);
    res.status(500).json({ message: error.message });
  }
};

let updateVehicleByID = async (req, res) => {
  try {
    let id = req.params.id;
    let updatedVehicle = await vehicleModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: "Vehicle Updated", updatedVehicle });
  } catch (error) {
    console.log("Error While updating Vehicle :", error.message);
    res.status(500).json({ message: error.message });
  }
};

let deleteVehicleById = async (req, res) => {
  try {
    let id = req.params.id;
    let deletedVehicle = await vehicleModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Vehicle Deleted", deletedVehicle });
  } catch (error) {
    console.log("Error While deleting  Vehicle  by id:", error.message);
    res.status(500).json({ message: error.message });
  }
};

let updateTripById = async (req, res) => {
  try {
    const { vehicleId, tripId } = req.params;
    const { startLocation, endLocation } = req.body;
    const vehicle = await vehicleModel.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    const trip = vehicle.trips.id(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    if (startLocation !== undefined) trip.startLocation = startLocation;
    if (endLocation !== undefined) trip.endLocation = endLocation;
    await vehicle.save();
    return res
      .status(200)
      .json({ message: "Trip updated successfully", updatedTrip: trip });
  } catch (error) {
    console.error("Update error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

let deleteTripById = async (req, res) => {
  try {
    let vehicleId = req.params.vehicleId;
    let tripId = req.params.tripId;
    let vehicle = await vehicleModel.findById(vehicleId);
    if (!vehicle) {
      return res
        .status(404)
        .json({ message: "No vehicle with that id to delete trip" });
    }
    // console.log(vehicle.trips);
    if (vehicle.trips.length === 0) {
      return res
        .status(404)
        .json({ message: "No trips found for this vehicle" });
    }
    vehicle.trips = vehicle.trips.filter(
      (trip) => trip._id.toString() != tripId
    );
    await vehicle.save();
    res.status(200).json({ message: "Trip Deleted successfully." });
  } catch (error) {
    console.log("Error While Deleting trip by vehicle ID:", error.message);
    res.status(500).json({ message: error.message });
  }
};
// complex queries
let carOrTruckVehicles = async (req, res) => {
  try {
    let vehicles = await vehicleModel.find({
      type: { $in: ["car", "truck"] },
    });
    res
      .status(200)
      .json({ message: "Vehicles with type of car and truck...", vehicles });
  } catch (error) {
    console.log(
      "Error While getting vehicles type of car and truck",
      error.message
    );
    res.status(500).json({ message: error.message });
  }
};

let vehiclesStWithDehliMumBang = async (req, res) => {
  try {
    let vehicles = await vehicleModel.find({
      "trips.startLocation": { $in: ["Delhi", "Mumbai", "Bangalore"] },
    });
    res
      .status(200)
      .json({ message: "vehicles Start With Delhi Mum Bang..", vehicles });
  } catch (error) {
    console.log(
      "Error While getting vehicles with start trip from delhi , banglore , mumbai",
      error.message
    );
    res.status(500).json({ message: error.message });
  }
};

let vehiclesWithTripDistance = async (req, res) => {
  try {
    let vehicles = await vehicleModel.find({
      "trips.distance": { $gte: 200 },
    });
    res.status(200).json({ message: "vehicles With Trip Distance 200km.." , vehicles });
  } catch (error) {
    console.log(
      "Error While getting vehicles with trip distance greater or equal to 200 km...",
      error.message
    );
    res.status(500).json({ message: error.message });
  }
};

let vehiclesWithStDate = async (req, res) => {
  try {
    let vehicles = await vehicleModel.find({
      "trips.startTime": { $gte: new Date(2024, 0, 1) },
    });
    res
      .status(200)
      .json({ message: "vehicles With Start Date after jan 1 2024", vehicles });
  } catch (error) {
    console.log(
      "Error While getting vehicles with trip st date  after jan 1 2024",
      error.message
    );
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addNewVehicle,
  getAllVehicles,
  updateVehicleByID,
  deleteVehicleById,
  addTripToVehicleByVehicleId,
  getVehicleById,
  updateTripById,
  deleteTripById,
  carOrTruckVehicles,
  vehiclesStWithDehliMumBang,
  vehiclesWithTripDistance,
  vehiclesWithStDate,
};
