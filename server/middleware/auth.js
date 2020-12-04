const Session = require('../models/session');
const auth = async (req, res, next) => {
    try {        
        const sessionId = req.sessionID
        const session = await Session.findOne({_id: sessionId}).exec();

        console.log('SESSIONID' ,sessionId);
        console.log('SESSION' ,session);
        const { id } = req.session
        console.log('req.session.id:', id);
        console.log('req.session.userId:', req.session.userId);

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