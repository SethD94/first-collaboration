const UserController = require('../controllers/User.js');

const UserRouter = (app) => {
  app.post('/user/signup', UserController.addUser);
}

module.exports = UserRouter;