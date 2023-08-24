const { Schema, model } = require("mongoose");

const coachSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    username: {
      type: String,
      required: [true, "Name is required."],
    },
    userType: {
      type: String,
      default: "coach"
    },
  },
  {
    timestamps: true,
  }
);

const Coach = model("Coach", coachSchema);

module.exports = Coach;
