const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
require('./auth')

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
 res.render('index')

})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}
app.get('/auth/protected',(req, res) => {
    res.render('protected')
});

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());

app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 5100);