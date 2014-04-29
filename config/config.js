module.exports = function(app) {
	app.set('port', process.env.PORT || 3000);
	app.set('env', process.env.ENVRIONMENT);
}