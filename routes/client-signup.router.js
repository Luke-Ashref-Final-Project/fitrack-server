const express = require("express");
const router = express.Router();
const { clientSignup } = require("../controllers/clientSignupController");

router.post("/signup/client", clientSignup);


module.exports = router;