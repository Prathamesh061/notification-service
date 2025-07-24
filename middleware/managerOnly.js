module.exports = function (req, res, next) {
    if (req.user.role !== 'Manager') return res.status(403).json({ message: 'Forbidden' });
    next();
};
