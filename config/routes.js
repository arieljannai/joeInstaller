// Utilities for path manipulation
var express = require('express'),
    path = require('path'),
    indexController = require('../app/controllers/index.js'),
    applicationController = require('../app/controllers/application.js'),
    usersController = require('../app/controllers/users.js');

module.exports = function(app) {
  var authController = require('../app/controllers/auth.js')(app);

  app.use('/', express.static(path.join(__dirname, '../', 'public/html')));
  app.use('/assets', express.static(path.join(__dirname, '../', 'public')));
	app.get('/users', usersController.getUsers);
  app.get('/auth/google', authController.authenticate('google'));
  app.get('/auth/google/return',
          authController.authenticate('google', { successRedirect: '/main.html',
                                                  failureRedirect: '/login.html' }));
    app.get('/applications', applicationController.getApplications);
    app.get('/applications/:id', applicationController.getApplicationById);
}
