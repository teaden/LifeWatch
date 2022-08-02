const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const PORT = process.env.PORT || 9000;

const app = express();
module.exports = app;

const buildApp = () => {

    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());

    app.use('/api', require('./api'));

    app.use(express.static(path.join(__dirname, '..', 'public')));

    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
            const err = new Error('Not found');
            err.status = 404;
            next(err);
        } else {
            next();
        }
    });
};

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

const listen = () => {
    const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
};

async function launchApp() {
    await buildApp();
    await listen();
}

launchApp();