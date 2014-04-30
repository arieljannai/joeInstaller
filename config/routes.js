// Utilities for path manipulation
var path = require('path'),
    indexController = require('../app/controllers/index.js'),
    usersController = require('../app/controllers/users.js');


module.exports = function(app, express) {
  var authController = require('../app/controllers/auth.js')(app);

  app.use('/', express.static(path.join(__dirname, '../', 'public/html')));
  app.use('/assets', express.static(path.join(__dirname, '../', 'public')));
	app.get('/users', usersController.getUsers);
  app.get('/auth/google', authController.authenticate('google'));
  app.get('/auth/google/return',
          authController.authenticate('google', { successRedirect: '/main.html',
                                                  failureRedirect: '/login.html' }));
}
