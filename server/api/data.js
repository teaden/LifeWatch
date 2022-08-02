const router = require('express').Router();
module.exports = router;

router.post('/', async (req, res, next) => {
    try {
        // Do regression predictions here and send back
        res.status(201).json();
    } catch (error) {
        next(error);
    }
});