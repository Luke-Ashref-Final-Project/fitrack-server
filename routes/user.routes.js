const express = require("express");
const router = express.Router();
const { isAuthenticated }= require('../middleware/jwt.middleware')
const { getUserProfile } = require('../controllers/userController');

router.get("/profile", isAuthenticated, getUserProfile );
// can export the payload and import it here, create an endpoint in react to handle it

module.exports = router;
