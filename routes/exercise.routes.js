const express = require("express");
const router = express.Router();
const {
  createNewExercise,
  viewExercisesOfCoach,
  viewExercisesOfClient,
  viewOneExercise,
} = require("../Controllers/exerciseController");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/exercise/new", createNewExercise);
router.get("/exercises/coach/:coachId", viewExercisesOfCoach);
router.get("/exercises/client/:clientId", viewExercisesOfClient);
router.get("/exercise/:exerciseId", viewOneExercise);

module.exports = router;
