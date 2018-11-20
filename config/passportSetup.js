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
      passReqToCallback: true

  }, (req, username, password, done) => {

       console.log(req.url);
       User.findOne({'username': username})
       .then(user => {
         if(user){
            console.log("user already exists");
            return done(null, false);
         } else {
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
        }
       })
       .catch(err => done(err));
 }
));
/* 
Login strategy

1) Passport is provided a username and password 
2) Check if the username exists
3) If correct username is entered
    Decrypt the password and check it
     if the password is correct
       log the user in
       return a token to the user 
     if the password is incorrect
       ask the user the enter the correct password
   If incorrect username is entered
  
    Return an error to the user and ask them to enter a valid username
*/
passport.use('local.login', new LocalStrategy({
    passReqToCallback: true

}, (req, username, password, done) => {
   
    User.find({username}).limit(1)
    .then(user => {
      if(!user){
        
          console.log("username doesn't exist");
          return done(null, false);
      } else {
  
        bcrypt.compare(password, user[0].password)
        .then((res) => {
          if(res){
            console.log("passwords match!");
            return done(null, user[0])
          } else {
            console.log("passwords do not match")
            return done(null, false);
          }
      })
      .catch(err => done(err));
      }
    })
    .catch(err => done(err));
 
}
));
  
