const isAdminMiddleware = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Permission denied' });
    }
    next();
};

module.exports = isAdminMiddleware;
