const Variation = require("../models/Variation.model");

const createVariation = async (req, res, next) => {
  try {

    const { weight, reps } = req.body;
    
    const createdVariation = await Variation.create({
      weights: weight,
      reps: reps,
    });

    if (createdVariation) {
      return res.status(200).json("variation created successfully", createdVariation);
    }

  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  createVariation,
};
