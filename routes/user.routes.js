const express = require("express");
const router = express.Router();
const { isAuthenticated }= require('../middleware/jwt.middleware')
const { getUserProfile } = require('../controllers/userController');

router.get("/profile", isAuthenticated, getUserProfile );


module.exports = router;
