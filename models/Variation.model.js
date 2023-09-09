const { Schema, model } = require("mongoose");

const variationSchema = new Schema(
  {
    exerciseid: {
      type: Schema.Types.ObjectId,
      ref: "Exercise", // Reference to the Exercise model
      required: [true, "Exercise ID is required."],
    },
    // variations: {
    //   type: Array,
    //   ref:"Variation",
    // },
    weight:{
      type: Number,
    },
    reps:{
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

const Variation = model("ExerciseVariation", variationSchema);

module.exports = Variation;
