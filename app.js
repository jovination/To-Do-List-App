const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const path = require('path'); // Import the path module

// Configure session middleware
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Require authentication configuration
require('./auth');

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Configure views directory

// Define route for home page
app.get('/', (req, res) => {
    res.render('index');
});

// Define route for Google OAuth authentication
app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Define callback route for Google OAuth authentication
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
    })
);

// Middleware to check if user is authenticated
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

// Define route for failed Google OAuth authentication
app.get('/auth/google/failure', (req, res) => {
    res.render('failure');
});

// Define protected route
app.get('/auth/protected', isLoggedIn, (req, res) => {
    res.render('protected'); // Ensure 'protected' matches the view filename
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(process.env.PORT || 5100, () => {
    console.log('Server is running...');
});
