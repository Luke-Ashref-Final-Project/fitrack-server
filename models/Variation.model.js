const { Schema, model } = require("mongoose");

const variationSchema = new Schema(
  {
    exerciseid: {
      type: Schema.Types.ObjectId,
      ref: "Exercise", // Reference to the Exercise model
      required: [true, "Exercise ID is required."],
    },
    reps: {
      type: Number,
      required: [true, "Reps count is required."],
    },
    sets: {
      type: Number,
      required: [true, "Sets count is required."],
    },
  },
  {
    timestamps: true,
  }
);

const ExerciseVariation = model("ExerciseVariation", variationSchema);

module.exports = ExerciseVariation;