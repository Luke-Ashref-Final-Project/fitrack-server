const pusher = require("../config/pusher.config");
const Coach = require("../models/Coach.model");

const subscribe = async (req, res, next) => {
    try {
        const user = req.payload;
        const { coachId } = req.params;
        const clientId = user._id;
        const clientName = user.username

        const coach = await Coach.findById(coachId);

        if (!coach) {
          return res.status(404).json({ message: 'Coach not found.' });
        }

        if (coach.subscribersIds.includes(clientId)) {
            return res.status(400).json({ message: 'Already subscribed to this coach.' });
        }

        // Notify the coach using Pusher
        const notification = {
            message: `${clientName} subscribed to you!`,
            clientId: clientId,
        };
        pusher.trigger(`coach-${coachId}`, 'new-subscriber', notification);


        coach.subscribersIds.push(clientId);
        await coach.save();
        return res.status(200).json({ message: 'Subscribed successfully.' });

    } catch (error) {
        console.log("Subscribe error:", error)
    };
};

const unSubscribe = async (req, res, next) => {
    try {
        const user = req.payload;
        console.log(user)
        const { coachId } = req.params;
        console.log(coachId)
        const clientId = user._id;

        const coach = await Coach.findById(coachId).select("username image subscribersIds")

        if (!coach) {
            return res.status(400).json({ message: 'Coach not found.' });
          }

        if (!coach.subscribersIds.includes(clientId)) {
            return res.status(404).json({ message: "You're not a subscriber!"})
        }
        
        coach.subscribersIds = coach.subscribersIds.filter(subscriberId => !subscriberId.equals(clientId));
        await coach.save();
        return res.status(200).json({ message: 'Unsubscribed successfully.' });

    } catch (error) {
        console.log("Unsubcribe error", error);
    }
};

module.exports = {
    subscribe,
    unSubscribe,
}