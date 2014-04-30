var passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost/auth/google/return',
    realm: 'http://localhost/'
  },
  function(identifier, profile, done) {
    done(0, profile);
  }
));

exports.authenticate = passport.authenticate.bind(passport);
