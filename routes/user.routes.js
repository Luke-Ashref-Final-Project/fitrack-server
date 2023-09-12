const express = require("express");
const router = express.Router();
const { updatePassword,
        getAllSubscribers,
        getAllCoaches,
        uploadPhoto,
        deleteProfile,
        updateDescription,
        } = require('../controllers/userController');
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require('../middleware/jwt.middleware');


router.get("/profile/getallsubscribers", isAuthenticated, getAllSubscribers);
router.get("/getcoach", isAuthenticated, getAllCoaches);

router.put("/profile/password", isAuthenticated, updatePassword);
router.put("/profile/upload", isAuthenticated, fileUploader.single("image"), uploadPhoto);
router.put("/profile/description", isAuthenticated, updateDescription);

router.delete("/profile/delete", isAuthenticated, deleteProfile);

module.exports = router;
