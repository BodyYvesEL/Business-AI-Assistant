const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.send({ user, token });
    } catch (err) {
        res.status(422).send(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid email or password');
        const isMatch = await user.checkPassword(password);
        if (!isMatch) throw new Error('Invalid email or password');
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.send({ user, token });
    } catch (err) {
        res.status(401).send(err);
    }
});

module.exports = router;
