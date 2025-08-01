let fs = require("fs");

let readData = () => {
  try {
    let dataFromReading = fs.readFileSync("db.json", "utf-8");
    if (!dataFromReading.trim()) {
      return [];
    }
    const data = JSON.parse(dataFromReading);
    return data;
  } catch (error) {
    console.log("Error :", error.message);
    return [];
  }
};

let writeData = (data) => {
  try {
    fs.writeFileSync("db.json", JSON.stringify(data));
  } catch (error) {
    console.log("Error:", error.message);
  }
};

let findDiffInDays = (borrowedDate) => {
  let bookBorrowedDate = new Date(borrowedDate);
  let currentDate = new Date();

  let diffInMs = currentDate - bookBorrowedDate;
  let diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays;
};

module.exports = { readData, writeData, findDiffInDays };
