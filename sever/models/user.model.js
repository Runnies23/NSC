const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  firebaseUID: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: Number,
    required: true,
    default: 1
  },
  exp: {
    type: Number,
    required: true,
    default: 0
  },
  coin: {
    type: Number,
    required: true,
    default: 0
  },
  Victory : {
    type: Number,
    required: true,
    default: 0
  },
  lastRewardDate: {
    type: Date,
    default: null
  }
  // }
}, {
  timestamps: true
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
