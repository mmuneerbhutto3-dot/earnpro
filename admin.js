const express = require('express');
const router = express.Router();

// Admin routes like approve deposit etc.
// Example: GET admin panel
router.get('/', (req, res) => {
    res.send("Admin panel coming soon");
});

module.exports = router;