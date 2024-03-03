const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://to-do-lyst.onrender.com/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // In this simplified example, we pass the profile directly to the done callback
    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  // Serialize user by saving the entire profile object
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Deserialize user by directly passing the profile object
  done(null, user);
});
