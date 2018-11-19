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
    return done with null and false
  else
    hash the password
    Create new user
3)Return done with the null and the new user
4)Assign the user a token

*/

  passport.use('local.signup', new LocalStrategy({

  }, (username, password, done) => {
       console.log("entered passport auth flow");
       User.findOne({'username': username})
       .then(user => {
         if(user){
            console.log("user already exists");
            return done(null, false);
         } 
            bcrypt.hash(password, 10)
            .then(hashedPassword => {
              const newUser = new User({
                username,
                password: hashedPassword,
              });
              newUser.save()
              console.log("user successfully created");
              return done(null, newUser);
            })
            .catch(err => done(err));     
         
       })
       .catch(err => done(err));
 }
));
  
