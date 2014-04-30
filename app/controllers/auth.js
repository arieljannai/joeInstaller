var passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy,
    User = require('../models/user.js'),
    Url = require('url'),
    auth = {};

module.exports = function(app) {

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new GoogleStrategy({
      returnURL: 'http://localhost:3000/auth/google/return',
      realm: 'http://localhost:3000/'
    },
    function(identifier, profile, done) {
      var token = Url.parse(identifier, true).query.id;
      User.findOne({token: token}, function(err, user) {
        var usr = user;

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
            if (!err) {
              done(null, usr);
            }
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
