import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust the import path as needed

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log('Token:', token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded:', decoded);

        const user = await User.findOne({ _id: decoded.id });
        console.log('User:', user);

        if (!user) {
            throw new Error('User not found');
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log('Error:', error);
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).send({ error: 'Token expired. Please login again.' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).send({ error: 'Invalid token. Please login again.' });
        } else {
            res.status(401).send({ error: 'Please authenticate.' });
        }
    }
};

export default authMiddleware;
