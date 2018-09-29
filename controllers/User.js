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

  // Return a list of users

  // return a user based on username or id
};

module.exports = UserController;
