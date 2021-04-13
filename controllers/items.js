const fs = require('fs');

const { updateOrInsert, listCollections, queryProjection } = require('../services/Mongo.service');

const { writeCSV } = require('../services/CSV.service');

const getCollectionName = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    
    //year - 0month if month < 10, month if not
    return`${year}-${month < 10 ? '0' : ''}${month}`;
}

const getYMD = date => {
    return date.toISOString().split('T')[0];
}

exports.addStatus = (req, res) => {
    const { item, status } = req.params;

    const currentDate = new Date();
    const YMD = getYMD(currentDate);

    updateOrInsert(
        getCollectionName(currentDate),
        { Item: item, Date: YMD },
        { Item: item, Status: status, Date: YMD },
        (err, result) => {
            err ? res.status(500).send(err) : res.send({ status: 'OK' });
        }
    );
}

exports.list = (req, res) => {
    listCollections((err, collections) => {
        err ? res.status(500).send(err) : res.send(collections);
    });
}

exports.download = (req, res) => {
    const { items } = req.params;

    queryProjection(items, {}, {}, (err, itemList) => {
        const filePath = `${process.env.DATA_FOLDER}/${items}.csv`;

        writeCSV(filePath, itemList, err => {
            err ? res.status(500).send(`Could not write CSV. Reason ${JSON.stringify(err)}`):

            res.download(filePath, `${items}.csv`, err => {
                if (err) res.status(500).send(`Could not send file. Reason ${JSON.stringify(err)}`);
            });
        });
    });
}
