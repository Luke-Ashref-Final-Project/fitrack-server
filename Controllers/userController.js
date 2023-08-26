const bcrypt = require("bcrypt");
const Client = require('../models/Client.model');
const Coach = require('../models/Coach.model');

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

    const passwordCorrect = await bcrypt.compare(currentPassword, foundUser.password);

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

module.exports = {
  updatePassword,
};
