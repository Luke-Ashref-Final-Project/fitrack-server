const { Schema, model } = require("mongoose");

const variationSchema = new Schema(
  {
    weight: {
      type: Number,
      // required: true,
      default: 0,
    },
    reps: {
      type: Number,
      // required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Variation = model("Variation", variationSchema);

module.exports = Variation;
