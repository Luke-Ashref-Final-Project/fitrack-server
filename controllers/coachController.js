const Coach = require("../models/Coach.model");

const getCoach = async (req, res, next) => {
    try {
        const { coachId } = req.params;
        const coach = await Coach.findById(coachId).select('username image description subscribersIds')

        if (!coach) {
            return res.status(404).json({ message: 'Coach not found.' });
          }
          
          return res.status(200).json({ coach: coach });

    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getCoach,
}