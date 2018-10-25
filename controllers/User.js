const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  passReqToCallback: true
}, function(name, username, password, done){
    User.findOne({'username':username}, function(err,user){
      if(err){
        return done(err);
      }
      if(user){
        return done(null, false);
      }
      const newUser = new User({
        username,
        password,
        name,
      });

      newUser.save(function(err){
        if (err){
            return done(err);
        }
        return done(null, newUser)
      })
    })
}

));


const UserController = {

  signUpNewUser: (req, res) => {
      passport.authenticate('local.signup',{
        successRedirect:'/signup',
        failureRedirect: '/signup',
        failureFlash: true
      });
  },


  // Add a new user
  addUser: (req, res) => {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(422).send('Please provide all info');
    }

    else {

      User.find({"username" : username})
        .then(user => {
            if(Object.keys(user).length <= 0){ 
              bcrypt.hash(password, saltRounds, function(err, password) {
                if (err){
                  return res.send("There was a password error");
                }// Store hash in your password DB.
                else{
                  const newUser = new User({
                    username,
                    password,
                    name,
                  });
                  newUser.save();
                  return res.status(201).send(newUser);
                }
              });

             }
            else {
              return res.send("Username already exists");
           }

        })
        .catch(err => res.send("Query Error"));


    }

  },
  //Log in an existing user

  loginUser: (req, res) => {
    const { username, password } = req.body;
    if(!username){
      return res.status(422).send('Please enter your Username');
    }
    else if (!password){
      return res.status(422).send('Please enter your Password');
    }

    else {

      User.findOne({"username" : username})
        .then(user => {
            if(Object.keys(user).length === 0){
             return res.send("Username not found"); 
              
            }
            else{
              bcrypt.compare(password, user.password, function(err, result) {
                // res == true
                if(err){
                  return res.send("there was an error");
                }
                else{
                  if(result){
                    return res.send(user);
                  }
                  else{
                    return res.send("Incorrect Credentials")
                  }
                }
            });
              

            }
        
          })
        .catch(err => res.send("Query Error with login method."));
    }
  },

  // Return a list of users (by username?)
  
  getUserList: (req, res) => {
    User.find()
      .then(users => res.send(users))
      .catch(err => console.log("Query unsuccessful"));
      
  },
  // return a user based on id
  getUserById: (req, res) => {
    const{id} = req.params;
    if(!id){
      return(res.send("Please enter a valid ID"));
    }
    else{
      User.findById(id)
        .then(user => res.send(user))
        .catch(err => res.send("Query Unsuccessful"));
        
    }

  },



};

module.exports = UserController;
