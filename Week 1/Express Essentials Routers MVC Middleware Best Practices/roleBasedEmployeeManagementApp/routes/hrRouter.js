let express = require("express");
const {
  getAllEmployees,
  updateEmployeeById,
} = require("../controllers/adminController");
const dataCheckMiddleware = require("../middlewares/dataCheckMiddleware");
let hrRouter = express.Router();

// get all employees
hrRouter.get("/all-employees", getAllEmployees);
// update employee by Id
hrRouter.put("/update-employee/:id", dataCheckMiddleware, updateEmployeeById);

module.exports = hrRouter;
