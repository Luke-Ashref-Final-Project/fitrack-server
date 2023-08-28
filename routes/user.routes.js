const express = require("express");
const router = express.Router();
const { updatePassword, getAllSubscribers, getAllCoaches } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.put("/profile/password", isAuthenticated, updatePassword);
router.get("/profile/getallsubscribers", isAuthenticated, getAllSubscribers);
router.get("/getcoach", isAuthenticated, getAllCoaches)

module.exports = router;
