// Importing packages and modules
const express = require('express');
const app = express();
const controller = require('./../controller/controller');
const session = require("express-session");
const passport = require("passport");
const flash = require('express-flash');

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Setting up session middleware with specific configurations
app.use(session({
  secret: "process.env.SESSION_SECRET",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 6000000 }
}));

// Initializing and configuring Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware functions for checking whether the client has authentication or not
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

function checkNotAuthentication(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

// Routes setup
app.get('/', controller.get_home);

app.get('/about_us', controller.get_about_us);

app.get('/post', controller.get_post);
app.post('/post', controller.post_post);

app.get('/myblog', checkNotAuthentication, controller.get_myblog);
app.delete('/deletePost/:prodId', checkNotAuthentication, controller.delete_post);

app.get('/signup', checkAuthentication, controller.get_signup);
app.post('/signup', controller.post_signup);

app.get('/signin', checkAuthentication, controller.get_signin);

// Route for handling user sign-in with Passport
app.post('/signin', function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

// Route for handling user logout
app.post('/logout', (req, res) => {
  req.logOut();
  res.redirect("/");
});

// Exporting the configured Express app
module.exports = app;
