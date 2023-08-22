const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController")
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post("/login", login)

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;
