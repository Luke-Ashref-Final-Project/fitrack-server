const express = require("express");
const router = express.Router();
const { updatePassword, getAllSubscribers, getAllCoaches, uploadPhoto } = require('../controllers/userController');
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.put("/profile/password", isAuthenticated, updatePassword);
router.get("/profile/getallsubscribers", isAuthenticated, getAllSubscribers);
router.get("/getcoach", isAuthenticated, getAllCoaches)
router.put("/profile/upload", isAuthenticated, fileUploader.single("image"), uploadPhoto)
router.get("/user", isAuthenticated, (req, res) => {
    console.log('payload', req.payload)
    res.status(200).json(req.payload)
  })
module.exports = router;
