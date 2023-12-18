const express = require("express");
const _ = express.Router();
const registrationControllers = require("../../controllers/registrationControllers");
const loginControllers = require("../../controllers/loginControllers");
const emailVerificationOtpMatch = require("../../controllers/emailVerificationOtpMatch");

_.post("/registration", registrationControllers);
_.post("/login", loginControllers);
_.post("/emailverificationotpmatch", emailVerificationOtpMatch);

module.exports = _;
