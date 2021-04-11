const csv = require('csv-parser');
const fs = require('fs');
const stringify = require('csv-stringify');

exports.getFilePath = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    //year - 0month if month < 10, month if not
    const filename = `${year}-${month < 10 ? '0' : ''}${month}.csv`;

    return `${process.env.DATA_FOLDER}/${filename}`;
}

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
