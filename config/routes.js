var indexController = require('../app/controllers/index.js');
var usersController = require('../app/controllers/users.js');

module.exports = function(app) {
	app.get('/', indexController.handleIndex);
	app.get('/users', usersController.getUsers);
}