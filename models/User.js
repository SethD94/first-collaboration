const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  name: { first: String, last: String },
});

module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByUsername = function(username, callback){
  let query = {username: username};
  User.findOne(query, callback);
}

module.exports.comparePassword = function(userPassword, callback){
  if (err) throw err;
  callback(null, isMatch);

}
