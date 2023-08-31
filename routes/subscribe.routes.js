const express = require("express");
const router = express.Router();
const { subscribe, unSubscribe } = require("../controllers/subscribeController");
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.post("/subscribe/:coachId", isAuthenticated, subscribe)
router.put("/unsubscribe/:coachId", isAuthenticated, unSubscribe)

module.exports = router;
