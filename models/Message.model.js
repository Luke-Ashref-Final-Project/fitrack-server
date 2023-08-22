const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
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
    message: {
      type: String,
      required: [true, "Message content is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
