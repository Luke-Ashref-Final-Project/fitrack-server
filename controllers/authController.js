const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client.model");
const Coach = require("../models/Coach.model");

const login = async (req, res, next) => {
  try {
    const { email, password, userType } = req.body;

    if (email === "" || password === "" || !userType) {
      return res.status(400).json({ message: "Provide email, password, and user type." });
    }

    let foundUser;

    if (userType === "client") {
      foundUser = await Client.findOne({ email });
    } else if (userType === "coach") {
      foundUser = await Coach.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid user type." });
    }

    if (!foundUser) {
      return res.status(401).json({ message: "User not found." });
    }

    const passwordCorrect = await bcrypt.compare(password, foundUser.password);

    if (passwordCorrect) {
      const { _id, email, username, image, description, userType } = foundUser;

      const payload = { _id, email, username, image, description, userType };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });
      
      return res.status(200).json({ authToken: authToken, user: payload, message: "Successfully logged in message"  });
    }

    return res.status(401).json({ message: "Unable to authenticate the user" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    login,
}
