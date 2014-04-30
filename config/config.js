var PORT = 3000
var ENV  = 'development'
module.exports = function(app) {
    app.set('port', PORT);
	app.set('env', ENV);
}