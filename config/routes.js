// Utilities for path manipulation
var path = require('path'),
    indexController = require('../app/controllers/index.js'),
    tagController = require('../app/controllers/tag.js'),
    applicationController = require('../app/controllers/application.js'),
    usersController = require('../app/controllers/users.js'),
    authController = require('../app/controllers/auth.js');

module.exports = function(app, express) {
    app.use('/', express.static(path.join(__dirname, '../', 'public/html')));
    app.use('/assets', express.static(path.join(__dirname, '../', 'public')));
    app.get('/users', usersController.getUsers);
    app.get('/auth/google', authController.authenticate('google'));
    app.get('/auth/google/return',
                authController.authenticate('google', { successRedirect: '/',
                                                       failureRedirect: '/login.html' }));
    app.get('/applications', applicationController.getApplications);
    app.get('/applications/:id', applicationController.getApplicationById);
    app.get('/tags', tagController.getTags);
    app.get('/tags/popular', tagController.getPopularTags);
    app.get('/tags/:name', tagController.getTag);
};