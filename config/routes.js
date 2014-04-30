// Utilities for path manipulation
var path = require('path'),
    indexController = require('../app/controllers/index.js'),
    usersController = require('../app/controllers/users.js'),
    authController = require('../app/controllers/auth.js');


module.exports = function(app, express) {
  app.use('/', express.static(path.join(__dirname, '../', 'public')));
	app.get('/users', usersController.getUsers);
  app.get('/auth/google', authController.authenticate('google'));
  app.get('/auth/google/return',
          authController.authenticate('google', { successRedirect: '/',
                                                   failureRedirect: '/login.html' }));
}
