const auth = async (req, res, next) => {
    try {

        const { user } = req.session;
         
        //Check for session
        if (!user) {
            return res.status(401).json({ message: 'Session is not active, authorization denied'})
        };
        
        next();

    } catch (err) {
        next(err)
        }
    };

module.exports = auth;