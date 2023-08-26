const express = require("express");
const router = express.Router();
const { updatePassword } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.put("/profile/password",isAuthenticated, updatePassword);

module.exports = router;
