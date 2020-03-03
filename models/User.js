const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  
});

const UserSchema2 = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  bucketname: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  }  
});

const User = mongoose.model('User', UserSchema);
const Userbucket = mongoose.model('Userbucket', UserSchema2);

module.exports.User = User;
module.exports.Userbucket = Userbucket;
