const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  name: { first: String, last: String }, required: false,
});

module.exports = mongoose.model('User', UserSchema);
