const bcrypt = require("bcrypt");
const Client = require("../models/Client.model");
const Coach = require("../models/Coach.model");

const getUserProfile = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming the decoded token has an 'id' field representing the user ID
      const user = await User.findById(userId).select('username email'); // Retrieve username and email
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = {
    getUserProfile,
  };