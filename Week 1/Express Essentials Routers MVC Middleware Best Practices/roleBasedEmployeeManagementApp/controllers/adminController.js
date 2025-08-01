const e = require("express");
const { readEmployees, writeEmployees } = require("../models/adminModel");

let getAllEmployees = (req, res) => {
  let employees = readEmployees();
  if (employees.length == 0) {
    return res
      .status(404)
      .json({ message: "There is no employees available..." });
  }
  res.status(200).json(employees);
};

let addNewEmployee = (req, res) => {
  let newEmployee = req.body;
  let employees = readEmployees();
  let id = employees.length == 0 ? 1 : employees[employees.length - 1].id + 1;
  newEmployee = { ...newEmployee, id };
  employees.push(newEmployee);
  writeEmployees(employees);
  res.status(200).json({ message: "Employee Added.." });
};

let updateEmployeeById = (req, res) => {
  let id = req.params.id;
  let updatedEmployee = req.body;
  let employees = readEmployees();
  if (employees.length == 0) {
    return res
      .status(404)
      .json({ message: "There is no employees available to update" });
  }
  let index = employees.findIndex((employee) => employee.id == id);
  if (index == -1) {
    return res
      .status(404)
      .json({
        message: "There is no employees available to update with that id",
      });
  }
  employees[index] = { ...updatedEmployee, id };
  writeEmployees(employees);
  res.status(200).json({ message: "Employee is Updated.." });
};
let deleteEmployeeBYId = (req, res) => {
  let id = req.params.id;
  let employees = readEmployees();
  if (employees.length == 0) {
    return res
      .status(404)
      .json({ message: "There is no employees available to delete" });
  }
  let index = employees.findIndex((employee) => employee.id == id);
  if (index == -1) {
    return res
      .status(404)
      .json({
        message: "There is no employees available to delete with that id",
      });
  }
  employees = employees.filter((employee) => employee.id != id);
  writeEmployees(employees);
  res.status(200).json({ message: "Employee is Deleted.." });
};

module.exports = {
  getAllEmployees,
  addNewEmployee,
  updateEmployeeById,
  deleteEmployeeBYId,
};
