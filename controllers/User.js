const User = require('../models/User.js');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;


const authentication = () => {
  passport.use(new LocalStrategy(
      function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, res.status(422).send('Please enter your Username'));
          }
          User.comparePassword(password, user.password, function(err, isMatch){
              if(err) throw err;
              if(isMatch){
                return done(null, user);
              }
              else{
                return done(null, false,res.send("Incorrect Password"));
              }
          });
        });

        /*const { username, password } = req.body;
            if(!username){
              return res.status(422).send('Please enter your Username');
            }
            else if (!password){
              return res.status(422).send('Please enter your Password');
            }

            else {

              User.findOne({"username" : username})
                .then(user => {
                    if(Object.keys(user).length <= 0){
                    return res.send("Username not found"); 
                      
                    }
                    else{
                      if(password === user.password){
                        return res.send(user);
                      }
                      else{
                        return res.send("Incorrect Password");
                      }
                      

                    }
                
                  })
                .catch(err => res.send("Username not found!"));
            }*/
      }
    ));

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
  }

const UserController = {
  // Add a new user
  addUser: (req, res) => {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(422).send('Please provide all info');
    }

    else{

      User.findOne({"username" : username})
        .then(user=> {
            if(Object.keys(user).length <= 0){
                const newUser = new User({
                  username,
                  password,
                  name,
                });
                newUser.save();
                return res.status(201).send(newUser);
              }
            else{
              return res.send("Username already exists");
            }

        })
        .catch(err => res.send("Query Error"));


    }

  },
  //Log in an existing user

  loginUser: (req, res) => {
    res.redirect('/')
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


module.exports = UserController, authentication;


