const User = require('../models/User.js');

const UserController = {
  // Add a new user
  addUser: (req, res) => {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(422).send('Please provide all info');
    }
    const newUser = new User({
      username,
      password,
      name,
    });
    newUser.save();
    return res.status(201).send(newUser);
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

 
    }
  },

  // Return a list of users (by username?)
  
  getUserList: (req, res) => {
    User.findOne().select("username")
      .then(users => res.send(users));
  },
  // return a user based on username or id
  getUser: (req, res) => {
    const{username, id} = req.body;

  },

};

module.exports = UserController;
