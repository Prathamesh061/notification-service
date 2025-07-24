const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function (req, res, next) {
    // Try to get token from Authorization header or cookies
    let token = req.headers['authorization']?.split(' ')[1];
    if (!token && req.cookies) {
        token = req.cookies.token;
    }

    if (!token) {
        if (req.accepts('html')) {
            return res.redirect('/login');
        }
        return res.status(401).json({ message: 'No token' });
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch {
        if (req.accepts('html')) {
            return res.redirect('/login');
        }
        res.status(401).json({ message: 'Invalid token' });
    }
};
