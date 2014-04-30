// Connection to mongodb
var mongoose = require('mongoose');

var PORT = 3000;
var ENV  = 'development';
var DB_CONN = 'mongodb://localhost/test';

mongoose.connect(DB_CONN);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var attempts = 1;
db.on('disconnected', function () {
    if (attempts == 5)
    {
        console.error('Five failed attempts at connecting to mongodb, NO DB!');
    }
    else
    {
        mongoose.connect(DB_CONN);
        attempts++;
    }
});
db.once('open', function callback () {
    console.log('Connected to Mongodb at ' + DB_CONN + '!');
});

module.exports = function(app) {
    app.set('port', PORT);
	app.set('env', ENV);
    app.set('db', db);
}