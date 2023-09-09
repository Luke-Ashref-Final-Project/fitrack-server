const Variation = require("../models/Variation.model");

const createVariation = async (req, res, next) => {
  try {

    const { exerciseId, variations } = req.body;
    
    const createdVariation = await Variation.create({
      exerciseid: exerciseId,
      variations: variations,
    });

    if (createdVariation) {
      return res.status(200).json(createdVariation);
    }

  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  createVariation,
};
