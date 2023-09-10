const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { createVariation, updateVariation, deleteVariation } = require("../controllers/variationController");

router.post("/variation/new", createVariation);
router.put("/variation/update", updateVariation);
router.delete("/variation/delete", deleteVariation);


module.exports = router;
