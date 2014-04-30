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
    User.findOne({token: token}, function(err, user) {
      debugger;
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

  return auth;
};
