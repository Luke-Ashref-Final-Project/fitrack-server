const express = require("express");
const router = express.Router();
const { createNewExercise } = require("../Controllers/exerciseController");

router.post("/exercise/new", createNewExercise);

module.exports = router;