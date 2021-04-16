var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var itemsRouter = require('./routes/api/items');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/items', itemsRouter);

//Serve our static react app
app.use(express.static('/app/gm-inv-web/build'));

try {
    if (!fs.existsSync('/app/csv-files')) {
        fs.mkdirSync('/app/csv-files');
    }
}
catch (err) {
    console.log(`Could not create /app/csv-files. Reason: "${JSON.stringify(err)}"`)
}

module.exports = app;
