const express = require("express");

const getMyMeetings = require('./../Controllers/meetings/getMyMeetings');
const createMeetings = require('./../Controllers/meetings/createNewMeeting');

const router = express.Router();

router.get("/api/meetings/viewMyMeetings", (req, res, next) => {
    getMyMeetings.getAllRelatedMeetings(req, res, next);
});

router.post("/api/meetings/create", (req, res, next) => {
    createMeetings.createMeeting(req, res, next);
});


module.exports = router;
