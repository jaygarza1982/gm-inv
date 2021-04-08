var express = require('express');
var router = express.Router();

router.get('/used', (req, res) => {
    res.send({ status: 'OK' });
});

module.exports = router;
