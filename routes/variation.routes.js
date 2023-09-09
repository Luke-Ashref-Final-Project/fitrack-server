const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

const { createVariation } = require("../controllers/variationController");

router.post("/variation/new", createVariation);

module.exports = router;
