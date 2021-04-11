var expect = require("chai").expect;
var app = require('../app');
var request = require('supertest');

//An array of dates in the past
//This is so we do not overwrite real data
const testDates = [
    new Date(2019, 1),
    new Date(2020, 5),
    new Date(2020, 10),
    new Date(2020, 11),
];

const testItems = [
    { Item: 'Item 01', Status: 'Used' },
    { Item: 'Item 02', Status: 'Broken' },
    { Item: 'Item 03', Status: 'Used' },
    { Item: 'Item04', Status: 'Broken' },
    { Item: 'Item05', Status: 'Used' },
    { Item: 'Item 06', Status: 'Broken' },
    { Item: 'Item 07', Status: 'Used' },
    { Item: 'Item 08', Status: 'Used' },
]

describe('Delete old test files', () => {
    //TODO: Delete collections here
});

describe('Insert items', () => {
    //TODO: GET requests to routes to add items
});

describe('Download contents', () => {
    //TODO: GET requests to get a CSV file
});
