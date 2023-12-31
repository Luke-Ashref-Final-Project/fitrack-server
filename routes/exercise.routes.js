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

router.get("/exercises/coach/:coachId", isAuthenticated, viewExercisesOfCoach);
router.get("/exercises/client/:clientId", isAuthenticated, viewExercisesOfClient);
router.get("/exercise/:exerciseId", isAuthenticated, viewOneExercise);

router.post("/exercise/new", isAuthenticated, createNewExercise);

router.put("/exercise/:exerciseId", isAuthenticated, updateExercise);

router.delete("/exercise/:exerciseId/delete", isAuthenticated, deleteExercise)

module.exports = router;
