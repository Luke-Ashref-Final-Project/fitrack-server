const bcrypt = require("bcrypt");
const Client = require("../models/Client.model");
const Coach = require("../models/Coach.model");
const jwt = require("jsonwebtoken");



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

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
    }

    if (await bcrypt.compare(newPassword, foundUser.password)) {
      return res.status(400).json({
        message:
          "New password can't be the current password"
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    foundUser.password = hashedNewPassword;
    await foundUser.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    next(error);
  }
};

///////////////////////////////////////////////////////////////////////////
const getAllSubscribers = async (req, res, next) => {
  try {
    const user = req.payload;
    const id = user._id;
    if (!id) {
      console.log("Missing user ID in payload");
      return res.status(400).json({ message: "Missing user ID" });
    }

    const theCoach = await Coach.findById(id).select("username image").populate("subscribersIds");
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

///////////////////////////////////////////////////////////////////////////

const getAllCoaches = async (req, res, next) => {
  try {
    const coaches = await Coach.find().select('username image');
    if (!coaches) {
      return res.status(404).json({ message: "No coaches found" });
    }
    res.json(coaches);
  } catch (error) {
    console.error(error);
  }
};

////////////////////////////////////////////////////////////////////////////

const uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded!");;
    }
    
    const imageUrl = req.file.path; 
    const userType = req.payload.userType; 
    const userId = req.payload._id; 
    
    let userModel;

    if (userType === "client") {
      userModel = Client;
    } else if (userType === "coach") {
      userModel = Coach;
    } else {
      return res.status(400).json({ message: "Invalid user type." });
    }

    const foundUser = await userModel.findByIdAndUpdate(
      userId,
      { image: imageUrl },
      { new: true }
    );
    // Update the payload
    const newPayload = { ...req.payload, image: imageUrl };
    const newToken = jwt.sign(newPayload, process.env.TOKEN_SECRET);
    res.json({ message: "Profile picture updated successfully.", user: foundUser, token: newToken });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found." });
    }

  } catch (error) {
    next(error);
  }
};

////////////////////////////////////////////////////////

const deleteProfile = async (req, res, next) => {
  try {
    const userId = req.payload._id; 
    const userType = req.payload.userType; 

    let userModel;

    if (userType === "client") {
      userModel = Client;
    } else if (userType === "coach") {
      userModel = Coach;
    } else {
      return res.status(400).json({ message: "Invalid user type." });
    }
    

    const deleteUser = await userModel.findByIdAndRemove(userId)

    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json({ message: "User was deleted successfully" })

  } catch (error) {
    console.log(error)
  }
};

/////////////////////////////////////////////////////////////

const updateDescription = async (req, res, next) => {
  try {
    const { description } = req.body;
    const user = req.payload;
    const userId = req.payload._id; 

    let userModel;

    if (user.userType === "client") {
      userModel = Client;
    } else if (user.userType === "coach") {
      userModel = Coach;
    } else {
      return res.status(400).json({ message: "Invalid user type." });
    }

    const foundUser = await userModel.findByIdAndUpdate(
      userId,
      { description: description },
      { new: true }
    );

    if (!foundUser) {
      return res.status(404).json({ message: "User not found." });
    }
    
    const newPayload = { ...req.payload, description: description };
    const newToken = jwt.sign(newPayload, process.env.TOKEN_SECRET);

    return res.status(200).json({ 
              message: "User's description was updated successfully",
              user: foundUser,
              token: newToken 
            });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  updatePassword,
  getAllSubscribers,
  getAllCoaches,
  uploadPhoto,
  deleteProfile,
  updateDescription,
};
