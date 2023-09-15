const Exercise = require("../models/Exercise.model");
const pusher = require('../config/pusher.config');

const viewOneExercise = async (req, res, next) => {
  try {
    const { exerciseId } = req.params;
    if (exerciseId === "") {
      return res.status(400).json({ message: "Cannot find exercise" });
    }
    const fetchExercise = await Exercise.findById(exerciseId).populate("variation");
    if (fetchExercise) {
      return res.status(200).json(fetchExercise);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

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
};

const createNewExercise = async (req, res, next) => {
  try {
    const { clientId, coachId, bodyPart, image, description, name, user } = req.body;

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

        // Notify the client using Pusher

      const notification = {
        message: `${user.username} sent you a new ${bodyPart} exercise!`,
        coachId: coachId,
      };
      console.log(notification)

      pusher.trigger(`client-${clientId}`, 'new-exercise', notification);

      return res.status(200).json(createdExercise);
    }
  } catch (err) {
    next(err);
  }
};

const updateExercise = async (req, res, next) => {
  try {
    const { description, variationId } = req.body;
    const { exerciseId } = req.params;

    if (!Array.isArray(variationId)) {
      return res.status(400).json({ message: "variationId should be an array." });
    }

    const updatedExercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      {
        description: description,
        variation: variationId,
      },
      { new: true }
    );
    if (updatedExercise) {
      return res.status(200).json(updatedExercise);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteExercise = async (req, res, next) => {
  try {
    const { exerciseId } = req.params;

    const delExercies = await Exercise.findByIdAndRemove(exerciseId)
    if (!delExercies) {
      return res.status(404).json({message: "Exercise not found"});
    }

    return res.status(200).json({message: "Exercise deleted successfully", delExercies});

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewExercise,
  viewExercisesOfCoach,
  viewExercisesOfClient,
  viewOneExercise,
  updateExercise,
  deleteExercise,
};
