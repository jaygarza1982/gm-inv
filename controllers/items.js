const fs = require('fs');
const { readCSV, writeCSV, appendCSV, getFilePath } = require('../services/CSV.service');

exports.addStatus = (req, res) => {
    const { item, status } = req.params;

    //Check if our file exists
    const filePath = getFilePath(new Date());

    //If our file exists
    if (fs.existsSync(filePath)) {
        //Read file, check if item exists already
        readCSV(filePath, (err, readItems) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            
            let foundItem = readItems.find(i => i.Item === item);

            //If we found our item, modify and rewrite CSV file
            if (foundItem) {
                foundItem.Status = status;

                writeCSV(filePath, readItems, err => {
                    err ? res.status(500).send(err) : res.send({ status: 'OK' });
                });
            }
            else {
                //If we did not find our item, we will just insert the status
                appendCSV(filePath, false, { Item: item, Status: status }, err => {
                    err ? res.status(500).send(err) : res.send({ status: 'OK' });
                });
            }
        });
    }
    else {
        //If our file does not exist, insert our item and status
        appendCSV(filePath, true, { Item: item, Status: status }, err => {
            err ? res.status(500).send(err) : res.send({ status: 'OK' });
        });
    }
}
