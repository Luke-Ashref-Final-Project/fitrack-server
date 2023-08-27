const bcrypt = require("bcrypt");
const Client = require("../models/Client.model");
const Coach = require("../models/Coach.model");

const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req.payload;
    let userModel;
    if (user.userType === "client") {
      userModel = Client;
    } else if (user.userType === "coach") {
      userModel = Coach;
    } else {
      return res.status(400).json({ message: "Invalid user type." });
    }

    const foundUser = await userModel.findById(user._id);

    if (!foundUser) {
      return res.status(401).json({ message: "User not found." });
    }

    const passwordCorrect = await bcrypt.compare(
      currentPassword,
      foundUser.password
    );

    if (!passwordCorrect) {
      return res.status(401).json({ message: "Incorrect current password." });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    foundUser.password = hashedNewPassword;
    await foundUser.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    next(error);
  }
};

const getAllSubscribers = async (req, res, next) => {
  try {
    const user = req.payload;
    const id = user._id;
    if (!id) {
      console.log("Missing user ID in payload");
      return res.status(400).json({ message: "Missing user ID" });
    }

    const theCoach = await Coach.findById(id).populate("subscribersIds");
    if (!theCoach) {
      console.log("No coach found for ID:", id);
      return res.status(404).json({ message: "Coach not found" });
    }

    return res.status(200).json(theCoach);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  updatePassword,
  getAllSubscribers,
};
