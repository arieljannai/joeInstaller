// The express.js framework
var express = require('express');
// Console logger for development 
var logger = require('morgan');
// Responsible for deserializing the url-encoded and json http requests
var bodyParser = require('body-parser');

var app = express();

// Define routes and configs
require('./config/config')(app);
require('./config/routes')(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(JSON.stringify({
            'message': err.message,
            'error': err}));
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

// RUN!
app.listen(app.get('port'));
console.log("Now serving at port " + app.get('port') +"!");

module.exports = app;
