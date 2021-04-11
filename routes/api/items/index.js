var express = require('express');
var router = express.Router();

const { addStatus, list, download } = require('../../../controllers/items');

const apiKeyAuth = (req, res, next) => {
    const { apiKey, item, status } = req.params;

    if (process.env.API_KEY === apiKey) return next();

    return res.status(401).send('Invalid API key. Please contact your app admin.')
}

router.get('/add-status/:apiKey/:item/:status', apiKeyAuth, addStatus);
router.get('/list/:apiKey', apiKeyAuth, list);
router.get('/download/:apiKey/:items', apiKeyAuth, download);

module.exports = router;
