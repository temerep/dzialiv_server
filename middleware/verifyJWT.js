const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({message: 'Not Authorized'})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (e) {
        res.status(401).json({message: 'Not Authorized'});
    }
}