const express = require('express');
const app = express();
const passport = require('passport');
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
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 5100);