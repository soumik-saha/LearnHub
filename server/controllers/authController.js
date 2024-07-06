import User from './../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const JWT_SECRET = process.env.JWT_SECRET;

// User Registration
const Register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user
        await newUser.save();

        // Create a JWT token
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        // Set the token in a cookie
        res.cookie('JSESSIONID', token, { httpOnly: true });

        // Set token in the response header
        res.setHeader('Authorization', token);

        res.status(201).json({ token });
    } catch (e) {
        console.error('Error: ', e.message);
        res.status(500).json({ message: 'Server Error!' });
    }
}

// User Login
const Login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Set the token in a cookie
        res.cookie('JSESSIONID', token, { httpOnly: true });

        // Set token in the response header
        res.setHeader('Authorization', token);

        res.json({ message: 'Login successful!', token, user: { id: user._id, username: user.username, email: user.email, roles: user.roles || ['ROLE'] } });
    }
    catch (e) {
        console.error('Error: ', e.message);
        res.status(500).json({ message: 'Server Error!' });
    }
}

// Logout User
const Logout = async (req, res) => {
    res.clearCookie('JSESSIONID');
    res.status(200).json({ message: 'Logout successful!' });
}

export { Register, Login, Logout };