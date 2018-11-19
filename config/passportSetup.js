const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.serializeUser(function(user, done){
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });
  
/*
Create strategy for signing in a new user

1)Passport is provided a username, pasword
2)Passport then queries the database to check if the username already exists
  If the username exists
    Request new username
  else
    hash the password
    Create new user
3)Return the user
4)Assign the user a token

*/

  passport.use('local.signup', new LocalStrategy({

  }, (username, password, done) => {


 }
));
  
