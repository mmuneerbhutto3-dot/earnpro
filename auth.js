const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password, referralCodeUsed } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let signupBonus = 0;
    let referrerUser = null;

    if (referralCodeUsed) {
        referrerUser = await User.findOne({ referralCode: referralCodeUsed });
        if (referrerUser) signupBonus = 20;
    }

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        balance: signupBonus,
        referralCode: Math.random().toString(36).substring(2, 8),
        referredBy: referralCodeUsed || null
    });

    await newUser.save();
    res.send("User registered successfully!");
});

module.exports = router;