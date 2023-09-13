const express = require("express");
const router = express.Router();
const { coachSignup } = require("../controllers/coachSignupController");

router.post("/coach", coachSignup);

module.exports = router;
