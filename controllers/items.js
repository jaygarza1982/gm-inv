const fs = require('fs');

const { updateOrInsert } = require('../services/Mongo.service');

const getCollectionName = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    //year - 0month if month < 10, month if not
    return`${year}-${month < 10 ? '0' : ''}${month}`;
}

exports.addStatus = (req, res) => {
    const { apiKey, item, status } = req.params;

    if (process.env.API_KEY != apiKey) return res.status(401).send('Invalid API key. Please contact your app admin.');

    updateOrInsert(
        getCollectionName(new Date()),
        { Item: item },
        { Item: item, Status: status },
        (err, result) => {
            err ? res.status(500).send(err) : res.send({ status: 'OK' });
        }
    );
}
