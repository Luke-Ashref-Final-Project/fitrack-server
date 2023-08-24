const bcrypt = require("bcrypt");
const Client = require("../models/Client.model");
const Coach = require("../models/Coach.model");
const jwt = require('jsonwebtoken');


const getUserProfile = async (req, res) => {
  try {
    const { _id, username, userType } = req.user;

    let user;

    if (userType === 'coach') {
      user = await Coach.findById(_id);
    } else if (userType === 'client') {
      user = await Client.findById(_id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userProfile = {
      username: username,
      userType: userType,
    };

    res.json(userProfile);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUserProfile,
};