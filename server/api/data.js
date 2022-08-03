const router = require('express').Router();
const LinearRegression = require('../regression/linear-regression');
module.exports = router;

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;

        const result = LinearRegression.evaluate(data);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});