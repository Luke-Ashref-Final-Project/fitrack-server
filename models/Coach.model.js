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
    image: {
      type: String,
      default: "/images/default.png"
    },
    userType: {
      type: String,
      default: "coach",
    },
    subscribersIds: [{
      type: Schema.Types.ObjectId,
      ref: 'Client',
    }],
  },
  {
    timestamps: true,
  }
);

const Coach = model("Coach", coachSchema);

module.exports = Coach;
