const Session = require('../models/session');
const auth = async (req, res, next) => {
    try {        
        const sessionId = req.sessionID
        const session = await Session.findOne({_id: sessionId}).exec();

        const { id } = req.session

        //Check for session
        if (!id) {
            return res.status(401).json({ message: 'Session is not active, authorization denied'})
        };
        
        return next();

    } catch (err) {
        return next(err)
        }
    };

module.exports = auth;