const User = require("../models/User");
const jwt = require('jsonwebtoken');
const secretKeys = require('../config/secretKeys');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Please provide correct credentials." });

        const findUser = await User.findOne({ email });
        if (findUser) return res.status(400).json({ message: "Wrong email or password" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword
        });
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        return res.sendStatus(500);
    }
}

const login = (req, res) => {
    // generate user token
    const token = jwt.sign(
        { id: req.user.id },
        secretKeys.jwtSecretKey,
        { expiresIn: '1d' }
    );
    return res.status(201).json({ token, userId: req.user.id });
}

const status = (req, res) => {
    return req.isAuthenticated() ? res.send({ userId: req.user.id }) : res.sendStatus(401);
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: "Error logging out" });
        res.status(200).json({ message: "Logged Out Successfully" });
    });
};

module.exports = {
    login,
    register,
    status,
    logout
};