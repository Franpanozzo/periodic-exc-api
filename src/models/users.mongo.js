const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  sex: {  // Puede ser un free agent
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('User', usersSchema);