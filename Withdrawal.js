// models/Withdrawal.js
const mongoose = require('mongoose');

const WithdrawalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    fee: { type: Number, default: 50 },
    payableAmount: { type: Number },
    status: { type: String, default: 'Pending' },
    method: { type: String },
    accountNo: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Withdrawal', WithdrawalSchema);