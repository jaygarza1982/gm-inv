var express = require('express');
var router = express.Router();

const { addStatus } = require('../../../controllers/items');

router.get('/add-status/:item/:status', addStatus);

module.exports = router;
