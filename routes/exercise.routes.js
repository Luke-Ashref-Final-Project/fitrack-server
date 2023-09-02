const express = require("express");
const router = express.Router();
const { createNewExercise, viewExercisesOfCoach} = require("../Controllers/exerciseController");
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.post("/exercise/new", createNewExercise);
router.get("/exercise/overview", viewExercisesOfCoach);

module.exports = router;