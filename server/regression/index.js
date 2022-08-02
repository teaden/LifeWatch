require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');
const LinearRegression = require('./linear-regression');

let { features, labels, testFeatures, testLabels } = loadCSV('./life-expectancy.csv', {
    shuffle: true,
    splitTest: 300,
    dataColumns: ['adultMortality', 'underFiveDeaths', 'infantDeaths', 'HIV', 'measles', 'BMI', 'alcohol', 'hepatitisB', 'polio', 'diphtheria', 'alcohol', 'GDP', 'population'],
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