module.exports = function(app) {
  var passport = require('passport'),
      GoogleStrategy = require('passport-google').Strategy,
      auth = {};

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
      debugger;
      done(null, profile);
    }
  ));

  auth.authenticate = passport.authenticate.bind(passport);

  return auth;
};

