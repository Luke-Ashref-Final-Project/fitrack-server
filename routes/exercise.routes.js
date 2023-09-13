const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

const {
  createNewExercise,
  viewExercisesOfCoach,
  viewExercisesOfClient,
  viewOneExercise,
  updateExercise,
  deleteExercise,
} = require("../controllers/exerciseController");

router.get("/exercises/coach/:coachId", viewExercisesOfCoach);
router.get("/exercises/client/:clientId", viewExercisesOfClient);
router.get("/exercise/:exerciseId", viewOneExercise);

router.post("/exercise/new", createNewExercise);

router.put("/exercise/:exerciseId", updateExercise);

router.delete("/exercie/:exerciseId/delete", deleteExercise)

module.exports = router;
