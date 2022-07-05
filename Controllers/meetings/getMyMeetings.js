const path = require("path");
const fileOperators = require("./../../Utils/fileOperations");
const createResponseType = require("./../../Utils/createResponse");


const getAllRelatedMeetings = (req, res, next) => {
  let newPath = path.join(__dirname, "../../");
  let data = fileOperators.readToFile(newPath + "MockData/meetings.json");
  if (!data.isError && data.length) {
    let parsedData = JSON.parse(data);
    console.log('Email id ', req.query);
    let filteredData = parsedData.filter(
      (response) => response.organizer === req.query.emailId
    );
    if (filteredData.length) {
      let getMeetings = createResponseType.createResponse(filteredData, 0);
      getMeetings.message = "Meetings data fetched";
      getMeetings.isVerifiedUser = true;
      res.send(getMeetings);
    } else {
      let getMeetings = createResponseType.createResponse([], 0);
      getMeetings.message = "Meetings data not found";
      getMeetings.isVerifiedUser = true;
      res.send(getMeetings);
    }
  } else {
    let getMeetings = createResponseType.createResponse([], 0);
    getMeetings.message = "Meetings data not found";
    getMeetings.isVerifiedUser = true;
    res.send(getMeetings);
  }
};

module.exports = { getAllRelatedMeetings };
