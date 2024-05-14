require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).send('No token provided.');
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(500).send('Failed to authenticate token.');
            }
            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).send('Access denied.');
            }
            req.user = decoded;
            next();
        });
    };
};

const generateToken = (user) => {
    return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { authMiddleware, generateToken };
