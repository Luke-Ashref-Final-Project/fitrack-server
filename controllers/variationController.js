const Variation = require("../models/Variation.model");

const createVariation = async (req, res, next) => {
  try {

    const { weight, reps } = req.body;
    
    const createdVariation = await Variation.create({
      weight: weight,
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

const updateVariation = async (req, res, next) => {
  try {
    const { weight, reps, variationId } = req.body;
    const updateVar = await Variation.findByIdAndUpdate(
      variationId,
      {weight: weight},
      {reps: reps}
    )

    if (!updateVar) {
      return res.status(404).json({ message: "Variation not found." });
    }

    return res.status(200).json("variation updated successfully", updateVar);

  } catch (error) {
    console.log(error)
  }
}

const deleteVariation = async (req, res, next) => {
  try {
    const { variationId } = req.body
    const deleteVar = await Variation.findByIdAndRemove(variationId)

    if (!deleteVar) {
      return res.status(404).json({ message: "Variation not found." });
    }

    return res.status(200).json("variation deleted successfully", deleteVar);

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createVariation,
  updateVariation,
  deleteVariation,
};
