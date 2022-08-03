const router = require('express').Router();
module.exports = router;

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        res.status(201).json(74);
    } catch (error) {
        next(error);
    }
});