const csv = require('csv-parser');
const fs = require('fs');
const stringify = require('csv-stringify');

exports.getFilePath = filename => {
    return `${process.env.DATA_FOLDER}/${filename}`;
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
