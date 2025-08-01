let fs = require("fs");

let readEmployees = () => {
  try {
    let employeeDataFromReading = fs.readFileSync("db.json", "utf-8");
    if (!employeeDataFromReading.trim()) {
      return [];
    }
    let employees = JSON.parse(employeeDataFromReading);
    return employees;
  } catch (error) {
    return [];
  }
};

let writeEmployees = (employeeData) => {
  try {
    fs.writeFileSync("db.json", JSON.stringify(employeeData));
  } catch (error) {
    console.log("Error :", error.message);
  }
};

module.exports = { readEmployees, writeEmployees };
