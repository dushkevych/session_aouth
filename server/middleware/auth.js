const auth = async (req, res, next) => {
    try {

        const { userId } = req.session;
         
        //Check for session
        if (!userId) {
            return res.status(401).json({ message: 'Session is not active, authorization denied'})
        };
        
        next();

    } catch (err) {
        next(err)
        }
    };

module.exports = auth;