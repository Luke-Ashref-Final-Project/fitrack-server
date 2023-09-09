const { Schema, model } = require("mongoose");

const variationSchema = new Schema(
  {
    // exerciseid: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Exercise", // Reference to the Exercise model
    //   required: [true, "Exercise ID is required."],
    // },
    // // variations: {
    // //   type: Array,
    // //   ref:"Variation",
    // // },
    weight:{
      type: Number,
      required: true,
    },
    reps:{
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Variation = model("Variation", variationSchema);

module.exports = Variation;
