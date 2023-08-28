const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
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
      default: "client"
    },
  },
  {
    timestamps: true,
  }
);

const Client = model("Client", clientSchema);

module.exports = Client;
