const Exercise = require("../models/Exercise.model");
// let ObjectId = require("mongoose").Types.ObjectId;

const viewExercisesOfClient = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    if (clientId === "") {
      return res.status(400).json({ message: "Cannot find exercises" });
    }
    const fetchedExercises = await Exercise.find({ clientid: clientId });
    if (fetchedExercises) {
      return res.status(200).json(fetchedExercises);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const viewExercisesOfCoach = async (req, res, next) => {
  try {
    const { coachId } = req.params;
    if (coachId === "") {
      return res.status(400).json({ message: "Cannot find exercises" });
    }
    const fetchedExercises = await Exercise.find({ coachid: coachId });
    if (fetchedExercises) {
      return res.status(200).json(fetchedExercises);
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
}

const createNewExercise = async (req, res, next) => {
  try {
    const { clientId, coachId, bodyPart, image, description, name } = req.body;
    if (
      clientId === "" ||
      coachId === "" ||
      bodyPart === "" ||
      image === "" ||
      description === ""
    ) {
      return res
        .status(400)
        .json({ message: "Provide all properties for exercise" });
    }

    const createdExercise = await Exercise.create({
      image: image,
      name: name,
      description: description,
      clientid: clientId,
      coachid: coachId,
      bodypart: bodyPart,
    });
    if (createdExercise) {
      return res.status(200).json(createdExercise);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewExercise,
  viewExercisesOfCoach,
  viewExercisesOfClient,
};
