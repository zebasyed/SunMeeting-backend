const path = require("path");
const fileOperators = require("./../../Utils/fileOperations");
const createResponseType = require("./../../Utils/createResponse");

const createMeeting = (req, res, next) => {
  let newPath = path.join(__dirname, "../../");

  const data = fileOperators.readToFile(newPath + "MockData/meetings.json");
  let parsedData = [];
  if (!data.isError && data.length) {
    parsedData = JSON.parse(data);

    let index = parsedData.findIndex(
      (item) => item.organizer === req.body.organizer
    );
    console.log("index+++++++",index)

    let obj = req.body.meetings[0];
    obj.meetingId = obj.desc + Math.floor(Math.random()*(999-100+1)+100);

    if (index === -1) {
      parsedData.push(req.body.meetings[0]);
      // parsedData = req.body;
    } else {
      parsedData[index].meetings.push(req.body.meetings[0]);
      console.log("check",parsedData.meetings);
    }
  } else {
    parsedData.push(req.body);
  }

  const result = fileOperators.writeToFile(
    newPath + "MockData/meetings.json",
    JSON.stringify(parsedData)
  );
  if (result) {
    let signupSuccessResponse = createResponseType.createResponse({}, 0);
    signupSuccessResponse.message = "Meeting saved successfully";
    signupSuccessResponse.isVerifiedUser = true;
    res.send(signupSuccessResponse);
  }
  //   let data = fileOperators.readToFile(newPath + "MockData/meetings.json");

  //   if (!data?.isError && data.length) {
  //     let parsedData = [];
  //     if (data) parsedData = JSON.parse(data);
  //     let isPresent = parsedData.findIndex(
  //       (result) => result.emailId === req.body.emailId
  //     );
  //     console.log(isPresent);
  //     if (isPresent === -1) {
  //       parsedData.push(req.body);
  //       const result = fileOperations.writeToFile(
  //         newPath + "MockData/users.json",
  //         JSON.stringify(parsedData)
  //       );
  //       console.log("isResult ", result);
  //       if (result) {
  //         let signupSuccessResponse = createResponseType.createResponse({}, 0);
  //         signupSuccessResponse.message = "User Registered Successfully.";
  //         signupSuccessResponse.isVerifiedUser = true;
  //         res.send(signupSuccessResponse);
  //       }
  //     } else {
  //       let signupSuccessResponse = createResponseType.createResponse({}, 0);
  //       signupSuccessResponse.message = "User already present.";
  //       signupSuccessResponse.isVerifiedUser = false;
  //       res.send(signupSuccessResponse);
  //     }
  //   }
};

module.exports = { createMeeting };