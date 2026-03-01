// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    totalDeposit: { type: Number, default: 0 },
    totalWithdrawal: { type: Number, default: 0 },
    referralCode: { type: String, unique: true },
    referredBy: { type: String },
    activePlans: [{
        planName: String,
        dailyProfit: Number,
        expiryDate: Date,
        activatedAt: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('User', UserSchema);