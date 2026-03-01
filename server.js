// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('node-cron');
const User = require('./models/User');

dotenv.config(); // Config.env read karega
const app = express();

app.use(express.json());
app.use(express.static('public'));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// CRON JOB: Runs every 24 hours to add profits
cron.schedule('0 0 * * *', async () => {
    const users = await User.find({ "activePlans.0": { $exists: true } });
    for (let user of users) {
        let dailyTotal = 0;
        user.activePlans = user.activePlans.filter(plan => {
            const daysLeft = Math.ceil((new Date(plan.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
            if (daysLeft > 0) {
                dailyTotal += plan.dailyProfit;
                return true;
            }
            return false; // Plan expired
        });
        user.balance += dailyTotal;
        await user.save();
    }
    console.log("Daily profits distributed.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));