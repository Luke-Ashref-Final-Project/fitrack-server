const Exercise = require("../models/Exercise.model");

const createNewExercise = async (req, res, next) => {
  try {
    const {clientId, coachId, bodyPart, image, description, name} = req.body;

    if (clientId === "" || coachId === "" || bodyPart === ""|| image === "" || description === "") {
        return res.status(400).json({ message: "Provide all properties for exercise" });
      }
    
    const createdExercise = await Exercise.create({
        image: image,
        name: name,
        description: description,
        clientid: clientId,
        coachid: coachId,
        bodypart: bodyPart,
    })
    if(createdExercise){
        return res.status(200).json(createdExercise);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewExercise,
};
