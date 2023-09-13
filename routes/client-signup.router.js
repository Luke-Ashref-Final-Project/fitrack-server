const express = require("express");
const router = express.Router();
const { clientSignup } = require("../controllers/clientSignupController");

router.post("/client", clientSignup);


module.exports = router;