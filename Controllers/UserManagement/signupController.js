// const mongoUtil = require("./../../Utils/mongoUtil");
const createResponseType = require("./../../Utils/createResponse");
const fileOperations = require("./../../Utils/fileOperations");
const fs = require("fs");
const path = require("path");
const decreptUtil = require("./../../Utils/decreptUserData");

const signup = (req, res, next) => {
  let newPath = path.join(__dirname, "../../");
  let data = fileOperations.readToFile(newPath + "MockData/users.json");
  if (!data.isError) {
    let parsedData = [];
    if (data) parsedData = JSON.parse(data);
    let isPresent = parsedData.findIndex(
      (result) => result.emailId === req.body.emailId
    );
    console.log(isPresent);
    if (isPresent === -1) {
      parsedData.push(req.body);
      const result = fileOperations.writeToFile(
        newPath + "MockData/users.json",
        JSON.stringify(parsedData)
      );
      console.log("isResult ", result);
      if (result) {
        let signupSuccessResponse = createResponseType.createResponse({}, 0);
        signupSuccessResponse.message = "User Registered Successfully.";
        signupSuccessResponse.isVerifiedUser = true;
        res.send(signupSuccessResponse);
      }
    } else {
      let signupSuccessResponse = createResponseType.createResponse({}, 0);
      signupSuccessResponse.message = "User already present.";
      signupSuccessResponse.isVerifiedUser = false;
      res.send(signupSuccessResponse);
    }
  }
};

module.exports = { signup };
