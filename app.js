// The express.js framework
var express = require('express');
// Utilities for path manipulation
var path = require('path');
// Console logger for development 
var logger = require('morgan');
// Responsible for deserializing the url-encoded and json http requests
var bodyParser = require('body-parser');

var app = express();

// Define routes and configs
require('./config/routes')(app);
require('./config/config')(app);

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// RUN!
app.listen(app.get('port'));

module.exports = app;