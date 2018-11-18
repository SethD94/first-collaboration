const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

passport.serializeUser(function(user, done){
  console.log('serializing: ', user)
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });
  
  passport.use('local-signup', new LocalStrategy({

  }, (username,password, done) => {

    User.findOne({ username }).then(user => {
      if (user) {
        return done(null, false);
      }
      bcrypt.hash(password, 10)
        .then(hashedPassword => {
          const newUser = new User({
            username,
            password: hashedPassword
          });
          newUser.save();
          return done(null, newUser);
        })
        .catch(err => done(err));
    })
    .catch(err => done(err));
  }
));
  
