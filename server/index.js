const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./api/index');

const port = 9000;
const app = express();

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());

app.use('/api', routes);

app.use((req, res, next) => {
    if (path.extname(req.path).length) {
        const err = new Error('Not found');
        err.status = 404;
        next(err);
    } else {
        next();
    }
});

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const startListening = () => {
    const server = app.listen(port, () =>
        console.log(`Listening on ${port}`)
    );
};

async function bootApp() {
    await startListening();
}

bootApp();