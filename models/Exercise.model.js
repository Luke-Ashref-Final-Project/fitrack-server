const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema(
  {
    image: {
        type: String,
        required: [true, "Image URL is required."],
      },
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    bodyparts: [
      {
        type: String,
        required: [true, "At least one body part is required."],
      },
    ],
    clientid: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: [true, "Client ID is required."],
    },
    coachid: {
      type: Schema.Types.ObjectId,
      ref: "Coach",
      required: [true, "Coach ID is required."],
    },
    variation: {
      type: Schema.Types.ObjectId,
      ref: "ExerciseVariation",
    },
  },
  {
    timestamps: true,
  }
);

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
