const jwt = require('jsonwebtoken');
require("dotenv").config();
const config = require("../../config");
const jwtSecretKey = config.jwtSecretKey

const authMiddleware = (req, res, next) => {
    console.log(req.headers);
    const token = req.headers.token;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
