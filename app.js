// The express.js framework
var express = require('express'),
// Console logger for development 
    logger = require('morgan'),
// Responsible for deserializing the url-encoded and json http requests
    bodyParser = require('body-parser'),
// Responsible for parsing cookies. Needed by express-session
    cookieParser = require('cookie-parser'),
// Responsible for managing the session
    session = require('express-session'),
    app = express();

app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
  secret: 'fa0dbde336355bf01b791c67acacf37f2d5ca7934ab0a844306958ec1de43e20143f24c54c7737112eef54f6d969e2566295def976998871c533b6acade262cf'
}));

// Define routes and configs
require('./config/config')(app);
require('./config/routes')(app);

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
