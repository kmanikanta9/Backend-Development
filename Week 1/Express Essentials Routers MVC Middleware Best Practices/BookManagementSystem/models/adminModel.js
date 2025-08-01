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

let findIndex = (index, arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id) {
      index = i;
      break;
    }
  }
  return index;
};

module.exports = { readData, writeData, findIndex };
