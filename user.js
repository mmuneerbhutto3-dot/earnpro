const express = require('express');
const router = express.Router();
const Withdrawal = require('../models/Withdrawal');
const User = require('../models/User');

router.post('/withdraw', async (req, res) => {
    const { amount, method, accountNo, userId } = req.body;
    const user = await User.findById(userId);

    if (user.balance < amount) return res.status(400).send("Insufficient Balance");

    const fee = 50;
    const amountToReceive = amount - fee;

    const newWithdrawal = new Withdrawal({
        userId: user._id,
        amount,
        fee,
        payableAmount: amountToReceive,
        status: 'Pending',
        method,
        accountNo
    });

    await newWithdrawal.save();
    res.send("Withdrawal requested successfully.");
});

module.exports = router;