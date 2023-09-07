const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

const {
  createNewExercise,
  viewExercisesOfCoach,
  viewExercisesOfClient,
  viewOneExercise,
} = require("../Controllers/exerciseController");

router.post("/exercise/new", createNewExercise);
router.get("/exercises/coach/:coachId", viewExercisesOfCoach);
router.get("/exercises/client/:clientId", viewExercisesOfClient);
router.get("/exercise/:exerciseId", viewOneExercise);

module.exports = router;
