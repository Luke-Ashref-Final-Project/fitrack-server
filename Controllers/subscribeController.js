const Coach = require("../models/Coach.model");
const jwt = require("jsonwebtoken");

// Work in progress
const subscribe = async () => {
    try {
        const user = req.payload;
        const { coachId } = req.params;
        const clientId = user._id;

        const coach = await Coach.findById(coachId);

        if (!coach) {
          return res.status(404).json({ message: 'Coach not found.' });
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