const Coach = require("../models/Coach.model");

// Work in progress
const subscribe = async (req, res, next) => {
    try {
        const user = req.payload;
        console.log(user)
        const { coachId } = req.params;
        console.log(coachId)
        const clientId = user._id;

        const coach = await Coach.findById(coachId);

        if (!coach) {
          return res.status(400).json({ message: 'Coach not found.' });
        }

        if (coach.subscribersIds.includes(clientId)) {
            return res.status(400).json({ message: 'Already subscribed to this coach.' });
        }

        coach.subscribersIds.push(clientId);
        await coach.save();
    
        return res.json({ message: 'Subscribed successfully.' });

    } catch (error) {
        console.log("Subscribe error:", error)
    };
}

module.exports = {
    subscribe,
}