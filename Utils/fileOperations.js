const fs = require("fs");

const writeToFile = (fileName, data) => {
  let isSuccess = true;
  try {
    fs.writeFileSync(fileName, data);
    return isSuccess;
  } catch (err) {
    return false;
  }
};

const readToFile = (fileName) => {
  try {
    const data = fs.readFileSync(fileName, "utf-8");
    return data;
  } catch (err) {
    return { isError: true, error: err };
  }
};

module.exports = { writeToFile, readToFile };
