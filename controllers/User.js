const User = require('../models/User.js');
const saltRounds = 12;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserController = {

  signInError: (req, res) => {
    res.send('error logging in');
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
