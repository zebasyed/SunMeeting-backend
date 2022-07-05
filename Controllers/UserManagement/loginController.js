// const mongoUtil = require("./../../Utils/mongoUtil");
const createResponseType = require("./../../Utils/createResponse");
const fileOperators = require("./../../Utils/fileOperations");
const decreptUtil = require("./../../Utils/decreptUserData");
const fs = require("fs");
const path = require("path");


const login = (req, res, next) => {
  console.log(req.query);
  let newPath = path.join(__dirname, "../../");
  let data = fileOperators.readToFile(newPath + "MockData/users.json");
  if (!data.isError) {
    let parsedData = JSON.parse(data);
    let index = parsedData.findIndex(
      (result) => (result.emailId === req.body.userName || result.userName === req.body.userName) && result.password === req.body.password
    );
    if (index === -1) {
      let loginSuccessResponse = createResponseType.createResponse({}, 0);
      loginSuccessResponse.message =
        "Login Failed please enter correct details";
      loginSuccessResponse.isVerifiedUser = false;
      res.send(loginSuccessResponse);
    } else {
      let loginSuccessResponse = createResponseType.createResponse(parsedData[index], 0);
      loginSuccessResponse.message = "Login successful";
      loginSuccessResponse.isVerifiedUser = true;
      res.send(loginSuccessResponse);
    }
  }
};

const signup = (req, res, next) => {};

module.exports = { login, signup };
