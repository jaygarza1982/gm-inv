const csv = require('csv-parser');
const fs = require('fs');
const stringify = require('csv-stringify');

exports.readCSV = (filePath, callback) => {
    let results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('error', err => { return callback(err) })
        .on('data', data => results.push(data))
        .on('end', () => {
            return callback(undefined, results);
        });
}

exports.appendCSV = (filePath, headers, item, callback) => {
    stringify([item], {
        header: headers
    }, (stringifyErr, output) => {
        if (stringifyErr) return callback(stringifyErr);

        fs.appendFile(filePath, output, err => {
            return callback(err);
        });
    });
}

exports.writeCSV = (filePath, items, callback) => {
    stringify(items, {
        header: true
    }, (stringifyErr, output) => {
        if (stringifyErr) return callback(stringifyErr);

        fs.writeFile(filePath, output, err => {
            return callback(err);
        });
    });
}
