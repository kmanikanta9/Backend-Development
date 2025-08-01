let express = require("express");
const {
  getAllEmployees,
  addNewEmployee,
  updateEmployeeById,
  deleteEmployeeBYId,
} = require("../controllers/adminController");
const dataCheckMiddleware = require("../middlewares/dataCheckMiddleware");

let adminRouter = express.Router();

// get all employees
adminRouter.get("/all-employees", getAllEmployees);
// add new Employee
adminRouter.post("/add-employee",dataCheckMiddleware ,addNewEmployee);
// update employee by id
adminRouter.put("/update-employee/:id", dataCheckMiddleware,updateEmployeeById);
// delete employee by id
adminRouter.delete("/delete-employee/:id", deleteEmployeeBYId);

module.exports = adminRouter;
