const bcrypt = require("bcrypt");
const Coach = require("../models/Coach.model");


const coachSignup = async (req, res, next) => {
  try {
    const { email, password, username, description } = req.body;

    if (email === "" || password === "" || username === "" || description === " ") {
        return res.status(400).json({ message: "Provide email, password username and description" });
      }
    
      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      // if (!emailRegex.test(email)) {
      //   return res.status(400).json({ message: "Provide a valid email address." });
      // }
    
      // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      // if (!passwordRegex.test(password)) {
      //   return res.status(400).json({
      //     message:
      //       "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      //   });
      // }

    const foundCoach = await Coach.findOne({ email });
    if (foundCoach) {
        return res.status(400).json({ message: "Coach already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdCoach = await Coach.create({ email, password: hashedPassword, username, description });

    res.status(201).json({ coach: createdCoach });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    coachSignup
}