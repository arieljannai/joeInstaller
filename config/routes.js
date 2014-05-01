var express = require('express'),
    path = require('path'),
    tagController = require('../app/controllers/tag.js'),
    applicationController = require('../app/controllers/application.js');

module.exports = function(app) {
  var authController = require('../app/controllers/auth.js')(app);

  app.use('/', express.static(path.join(__dirname, '../', 'public/html')));
  app.use('/assets', express.static(path.join(__dirname, '../', 'public')));
  app.use('/assets/bower', express.static(path.join(__dirname, '../', 'bower_components')));
  app.get('/auth/google', authController.userUnauthenticatedOrRedirect('/main.html'), authController.authenticate('google'));
  app.get('/auth/google/return',
          authController.authenticate('google', { successRedirect: '/main.html',
                                                  failureRedirect: '/login.html' }));
  app.get('/applications', applicationController.getApplications);
  app.get('/applications/:id', applicationController.getApplicationById);
  app.get('/tags', tagController.getTags);
  app.get('/popular/tags', tagController.getPopularTags);
  app.get('/tags/:name', tagController.getTag);
  app.get('/users', authController.getUsers);
  app.get('/users/:token', authController.getUser);
  app.get('/user', authController.getAuthenticatedUser);
};
