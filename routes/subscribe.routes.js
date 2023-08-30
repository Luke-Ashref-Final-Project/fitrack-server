const express = require("express");
const router = express.Router();
const { subscribe } = require("../controllers/subscribeController");
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.post("/subscribe/:coachId", isAuthenticated, subscribe)

module.exports = router;
