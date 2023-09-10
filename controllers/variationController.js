const Variation = require("../models/Variation.model");

const createVariation = async (req, res, next) => {
  const { reps, weight } = req.body;
  try {
    const createdVariation = await Variation.create({
      reps: reps,
      weight: weight,
    });
    if (createdVariation) {
      return res
        .status(200)
        .json({ message: "New variation is created", createdVariation });
    } else {
      return res.status(400).json({ message: "Failed to create variation." });
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const updateVariation = async (req, res, next) => {
  try {
    const { weight, reps, variationId } = req.body;
    console.log(req.body);
    const updateVar = await Variation.findByIdAndUpdate(
      variationId,
      { weight: weight, reps: reps },
      { new: true }
    );
    if (!updateVar) {
      return res.status(404).json({ message: "Variation not found." });
    }
    return res
      .status(200)
      .json({ message: "variation updated successfully", updateVar });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteVariation = async (req, res, next) => {
  try {
    const { variationId } = req.body;
    console.log("VariationId", variationId);
    const deleteVar = await Variation.findByIdAndRemove(variationId);

    if (!deleteVar) {
      return res.status(404).json({ message: "Variation not found." });
    }

    return res
      .status(200)
      .json({ message: "variation deleted successfully", deleteVar });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createVariation,
  updateVariation,
  deleteVariation,
};
