var expect = require("chai").expect;
var app = require('../app');
var request = require('supertest');

const { readCSV, writeCSV, appendCSV, getFilePath } = require('../services/CSV.service');

var fs = require('fs');

//An array of dates in the past
//This is so we do not overwrite real data
const testDates = [
    new Date(2019, 1),
    new Date(2020, 5),
    new Date(2020, 10),
    new Date(2020, 11),
];

const testFiles = testDates.map(date => getFilePath(date));

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
    it('Deletes old test file', () => {
        try {
            //Delete test files if they exist
            testFiles.forEach(file => {
                fs.existsSync(file) ?
                fs.unlinkSync(file) :
                console.log(`${file} does not exist.`)
            });
        } catch (err) {
            console.log(err);

            //Bail out of tests
            expect(0).to.equal(1);
        }
    });
});

describe('Insert items', () => {
    
    it('Adds the items', () => {
        appendCSV(testFiles[0], true, testItems[0], err => {
            expect(err).to.equal(null);

            appendCSV(testFiles[0], false, testItems[1], err => {
                expect(err).to.equal(null);

                readCSV(testFiles[0], (err, items) => {
                    expect(err).to.equal(undefined);

                    expect(items[0] == testItems[0]);
                });
            })
        });
    });

});

describe('Modify items', () => {
    it('Insert and modify items', () => {
        //Append first file to csv with headers because it is the first item
        appendCSV(testFiles[1], true, testItems[0], err => {
            expect(err).to.equal(null);

            //Append second item to csv
            appendCSV(testFiles[1], false, testItems[1], err => {
                expect(err).to.equal(null);

                //Ensure our item was added
                readCSV(testFiles[1], (err, items) => {
                    expect(err).to.equal(undefined);
    
                    expect(items[0] == testItems[0]);

                    //Change a status of an item and rewrite the items
                    items[0].Status = 'Broken';

                    writeCSV(testFiles[1], items, err => {
                        expect(err).to.equal(null);

                        //Ensure our items were changed as expected
                        readCSV(testFiles[1], (err, items) => {
                            expect(err).to.equal(undefined);

                            expect(items[0].Status).to.equal('Broken');
                            expect(items[1].Status).to.equal('Broken');

                            expect(items[0].Item).to.equal(testItems[0].Item);
                            expect(items[1].Item).to.equal(testItems[1].Item);

                            //Add another item to the csv and ensure our items are as expected
                            appendCSV(testFiles[1], false, testItems[2], err => {
                                expect(err).to.equal(null);

                                readCSV(testFiles[1], (err, items) => {
                                    expect(items[0].Status).to.equal('Broken');
                                    expect(items[1].Status).to.equal('Broken');
                                    expect(items[2].Status).to.equal(testItems[2].Status);

                                    expect(items[0].Item).to.equal(testItems[0].Item);
                                    expect(items[1].Item).to.equal(testItems[1].Item);
                                    expect(items[2].Item).to.equal(testItems[2].Item);
                                });
                            })
                        });
                    });
                });
            })
        });
    });
});
