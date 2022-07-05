const express = require("express");

const loginController = require('./../Controllers/UserManagement/loginController');
const signupController = require('./../Controllers/UserManagement/signupController');
const router = express.Router();

router.post("/api/auth/login", (req, res, next) => {
  loginController.login(req, res, next);
});

router.post("/api/auth/register", (req, res, next) => {
  signupController.signup(req, res, next);
})

module.exports = router;
