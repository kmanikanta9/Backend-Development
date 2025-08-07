let express = require("express");

const {
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
} = require("../controllers/vehicleController");

let vehicleRouter = express.Router();

// complex queries 
vehicleRouter.get("/carOrTruckVehicles",carOrTruckVehicles)
vehicleRouter.get("/vehiclesStWithDehliMumBang",vehiclesStWithDehliMumBang)
vehicleRouter.get("/vehiclesWithTripDist", vehiclesWithTripDistance)
vehicleRouter.get("/vehiclesWithStDate",vehiclesWithStDate)

// normal dynamic queries 
vehicleRouter.post("/add-vehicle", addNewVehicle);
vehicleRouter.get("/all-vehicles", getAllVehicles);
vehicleRouter.get("/:id", getVehicleById);
vehicleRouter.put("/update-vehicle/:id", updateVehicleByID);
vehicleRouter.delete("/delete-vehicle/:id", deleteVehicleById);
vehicleRouter.post("/add-trip/:id", addTripToVehicleByVehicleId);
vehicleRouter.patch("/update-trip/:vehicleId/:tripId" , updateTripById)
vehicleRouter.delete("/delete-trip/:vehicleId/:tripId" , deleteTripById)





module.exports = vehicleRouter;
