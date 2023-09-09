const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { createVariation, updateVariation, deleteVariation } = require("../controllers/variationController");

router.post("/variation/new", createVariation);
router.put("/variation/:variationId/update", updateVariation);
router.delete("/varriation/:variationId/delete", deleteVariation);

module.exports = router;
