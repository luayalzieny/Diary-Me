// Required modules
const bcrypt = require('bcrypt');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('./../db/user');
const Blog = require('./../db/blog');

// Custom fields for Passport local strategy
const customFields = {
  usernameField: "email",
  passwordField: "password"
};

// Authorization using Sequelize and Passport
passport.use(new LocalStrategy(customFields, (email, password, done) => {
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: "Email doesn't exist" });
      }

      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      });
    })
    .catch(err => console.log(err));
}));

// Passport serialization and deserialization for user sessions
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findByPk(id).then(function (user) {
    if (user) {
      return done(null, user);
    } else {
      return done(user.errors, null);
    }
  });
});

//  routes and functions
exports.get_home = (req, res) => {
  console.log(req.user);
  res.render("home", { user: req.user });
};

exports.get_about_us = (req, res) => {
  res.render('about_us', { user: req.user });
};

exports.get_signup = (req, res) => {
  res.render('signup', { user: req.user, err: "" });
};

exports.post_signup = (req, res) => {
  let password = req.body.password;
  bcrypt.hash(password, 10, function (err, hash) {
    password = hash;
    User.create({
      username: req.body.username,
      email: req.body.email,
      number: req.body.number,
      password: password
    })
      .then((result) => {
        console.log("user", result);
        return res.redirect("/");
      })
      .catch(err => console.log(err));
  });
};

exports.get_signin = (req, res) => {
  res.render("signin", { user: req.user });
};

exports.get_post = (req, res) => {
  res.render('post', { user: req.user });
};

exports.post_post = (req, res) => {
  var title = req.body.title;
  var text = req.body.text;

  req.user.createBlog({ title: title, post: text })
    .then(result => {
      console.log(result);
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.get_myblog = (req, res) => {
  req.user.getBlogs(req.user.id)
    .then(result => {
      console.log(result.length);
      res.render("myblog", { user: req.user, blog: result });
    })
    .catch(err => console.log(err));
};

exports.delete_post = (req, res) => {
  const postId = req.params.prodId;
  console.log(postId);
  Blog.findByPk(postId)
    .then(post => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return post.destroy();
    })
    .then(result => {
      console.log('DESTROYED POST');
      res.status(200).json({ message: 'Success' });
    })
    .catch(err => {
      res.status(400).json({ message: 'Deletion failed' });
    });
};
