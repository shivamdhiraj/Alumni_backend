const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');

const verifyUser = (req, res, next) => {
    const { token } = req.cookies;
    !token && res.status(401).json("User not authenticated !");
    
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, payload) => {
        if (err) {
            return next(new ErrorHandler("Invalid Token", 403));
        } 
        else {
            req.data = payload;
            next();
        } 
    })
}

module.exports = { verifyUser };    