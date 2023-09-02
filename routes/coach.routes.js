const express = require("express");
const router = express.Router();
const { getCoach } = require("../controllers/coachController");
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.get("/coaches/:coachId", isAuthenticated, getCoach)

module.exports = router;
