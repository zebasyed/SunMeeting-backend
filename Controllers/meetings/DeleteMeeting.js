const path = require("path");
const fileOperators = require("./../../Utils/fileOperations");
const createResponseType = require("./../../Utils/createResponse");

const deleteMeeting = (req, res, next) => {
  let newPath = path.join(__dirname, "../../");

  const data = fileOperators.readToFile(newPath + "MockData/meetings.json");
  let parsedData = [];
  if (!data?.isError && data.length) {
    parsedData = JSON.parse(data);

    let index = parsedData.findIndex(
      (item) => item.organizer === req.query.organizer
    );

    if (index === -1) {
      let notFound = createResponseType.createResponse({}, 0);
      notFound.message = "User not found";
      notFound.isAvailable = false;
      res.send(notFound);
    } else {
      let meetingId = parsedData[index].findIndex(
        (item) => item.meetingId === req.body.meetingId
      );

      parsedData[index].meetings.splice(meetingId, 1);
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
    }
  }
};

module.exports = { deleteMeeting };