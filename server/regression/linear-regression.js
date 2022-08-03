const tf = require('@tensorflow/tfjs');
const _ = require('lodash');
const loadCSV = require('./load-csv');
const fs = require('fs');

class LinearRegression {

    constructor(features, labels, options) {
        this.features = features ? this.processFeatures(features) : [];
        this.labels = labels ? tf.tensor(labels) : [];
        this.mseHistory = [];

        this.options = features ? Object.assign({ learningRate: 0.1, iterations: 1000, batchSize: features.length }, options) : {};

        this.weights = features ? tf.zeros([this.features.shape[1], 1]) : [];
    }

    gradientDescent(features, labels) {
        const currentGuesses = features.matMul(this.weights);
        const differences = currentGuesses.sub(labels);
        const slopes = features
            .transpose()
            .matMul(differences)
            .div(features.shape[0]);

        this.weights = this.weights.sub(slopes.mul(this.options.learningRate));
    }

    train() {
        const batchQuantity = Math.floor(this.features.shape[0] / this.options.batchSize);
        for (let i = 0; i < this.options.iterations; i++) {
            for (let j = 0; j < batchQuantity; j++) {
                const startIndex = this.options.batchSize * j;
                const { batchSize } = this.options;

                const featureSlice = this.features.slice([startIndex, 0], [batchSize, -1]);
                const labelSlice = this.labels.slice([startIndex, 0], [batchSize, -1]);

                this.gradientDescent(featureSlice, labelSlice);
            }
            this.recordMSE();
            this.updateLearningRate();
        }
    }

    predict(observations) {
        return this.processFeatures(observations).matMul(this.weights);
    }

    test(testFeatures, testLabels) {
        testFeatures = this.processFeatures(testFeatures);
        testLabels = tf.tensor(testLabels);

        const predictions = testFeatures.matMul(this.weights);

        const res = testLabels.sub(predictions)
            .pow(2)
            .sum()
            .get();

        const tot = testLabels.sub(testLabels.mean())
            .pow(2)
            .sum()
            .get();

        return 1 - res / tot;
    }

    processFeatures(features) {
        features = tf.tensor(features);

        if (this.mean && this.variance) {
            features = this.applyStandardization(features, this.mean, this.variance);
        } else {
            features = this.standardize(features);
        }

        features = tf.ones([features.shape[0], 1]).concat(features, 1);

        return features;
    }

    standardize(features) {
        const { mean, variance } = tf.moments(features, 0);

        this.mean = mean;
        this.variance = variance;

        return this.applyStandardization(features, mean, variance);
    }

    applyStandardization(features, mean, variance) {
        return features.sub(mean).div(variance.pow(0.5));
    }

    recordMSE() {
        const mse = this.features
            .matMul(this.weights)
            .sub(this.labels)
            .pow(2)
            .sum()
            .div(this.features.shape[0])
            .get();

        this.mseHistory.unshift(mse);
    }

    updateLearningRate() {
        if (this.mseHistory.length < 2) {
            return;
        }

        if (this.mseHistory[0] > this.mseHistory[1]) {
            this.options.learningRate /= 2;
        } else {
            this.options.learningRate *= 1.05;
        }
    }
}

LinearRegression.saveWeights = function () {
    let { features, labels, testFeatures, testLabels } = loadCSV('./regression/life-expectancy.csv', {
        shuffle: true,
        splitTest: 300,
        dataColumns: ['adultMortality', 'underFiveDeaths', 'infantDeaths', 'HIV', 'measles', 'hepatitisB', 'polio', 'diphtheria', 'BMI', 'alcohol', 'GDP', 'population'],
        labelColumns: ['lifeExpectancy']
    });

    const regression = new LinearRegression(features, labels, {
        learningRate: 0.1,
        iterations: 100,
        batchSize: 100,
    });

    regression.train();
    const r = regression.test(testFeatures, testLabels);

    console.log('R2 is', r);

    const mean = Array.from(regression.mean.dataSync());
    const variance = Array.from(regression.variance.dataSync());
    const weights = Array.from(regression.weights.dataSync());

    const savedRegression = JSON.stringify({ mean, variance, weights });

    fs.writeFile('./model.json', savedRegression, function (err) {
        if (err) {
            console.log('There has been an error saving your configuration data.');
            console.log(err.message);
            return;
        }
        console.log('Configuration saved successfully.');
    });
};

LinearRegression.evaluate = function (inputObj) {

    const data = fs.readFileSync('./server/regression/model.json');
    try {
        const parsedData = JSON.parse(data);
        const { mean, variance, weights } = parsedData;
        const newRegression = new LinearRegression();

        newRegression.weights = tf.tensor(weights.map(entry => [entry]));
        newRegression.mean = tf.tensor([mean]);
        newRegression.variance = tf.tensor([variance]);

        const inputArr = [];
        for (const key in inputObj) {
            inputArr.push(inputObj[key]);
        }

        return newRegression.predict([inputArr]).get(0, 0);
    }
    catch (err) {
        console.log('There has been an error parsing your JSON.');
        console.log(err);
    }
};

module.exports = LinearRegression;