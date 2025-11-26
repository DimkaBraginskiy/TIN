const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('random');
});

router.get('/random', (req, res) => {
    // Generate random data:
    const randomValue = Math.floor(Math.random() * 1000);

    setTimeout(() => {
        res.json({
            success: true,
            randomValue: randomValue
        });
    }, 100);
});

module.exports = router;