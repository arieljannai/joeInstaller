/**
 * Authentication controller
 * Manages the authentication in the system
 */


var passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy,
    User = require('../models/user.js'),
    Url = require('url'),
    auth = {};

var getTokenFromIdentifier = function(identifier) {
  return Url.parse(identifier, true).query.id;
};

module.exports = function(app) {

  app.use(passport.initialize());
  app.use(passport.session());

  // Serialize user to session
  passport.serializeUser(function(user, done) {
    debugger;
    done(null, user.token);
  });

  // Deserialize user from session
  passport.deserializeUser(function(token, done) {
    debugger;
    User.findOne({token: token}, function(err, user) {
      done(err, user);
    });
  });

  // Define googe strategy for passport
  passport.use(new GoogleStrategy({
      returnURL: 'http://' + app.get('domain') + ':' + app.get('port') + '/auth/google/return',
      realm: 'http://' + app.get('domain') + ':' + app.get('port') + '/'
    },
    function(identifier, profile, done) {
      var token = getTokenFromIdentifier(identifier);
      User.findOne({token: token}, function(err, user) {
        var usr = user;

        // Create user if not found
        if (!usr) {
          usr = new User({
            token: token,
            displayName: profile.displayName,
            name: {
              givenName: profile.name.givenName,
              familyName: profile.name.familyName
            },
            applications: []
          });

          usr.save(function(err) {
            done(err, usr);
          });
        } else {
          done(null, usr);
        }
      });
    }
  ));

  auth.authenticate = passport.authenticate.bind(passport);
  auth.getUsers = function(req, res) {
    User.find(function(err, users) {
      res.json(users);
    });
  };
  auth.getUser = function(req, res) {
    var token = req.params.token;

    User.findOne({token: token}, function(err, user) {
      res.json(user);
    });
  };
  auth.getAuthenticatedUser = function(req, res) {
       res.json((req.user) ? {
         displayName: req.user.displayName,
         name: req.user.name
         } : null);
  };
  auth.userAuthenticatedOrRedirect = function(url) {
    return function(req, res, next) {
      if (req.isUnauthenticated()) {
        res.redirect(url);
      } else {
        next();
      }
    };
  };
  auth.userUnauthenticatedOrRedirect = function(url) {
    return function(req, res, next) {
      if (req.isAuthenticated()) {
        res.redirect(url);
      } else {
        next();
      }
    };
  };

  return auth;
};
