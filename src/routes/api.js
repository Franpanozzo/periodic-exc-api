const express = require('express');
const jwt = require("jsonwebtoken");

const usersRouter = require('./users/users.router');
const { verifyToken } = require('./auth');

const api = express.Router();

api.post('/login', (req, res) => {
  const username = req.body.username; //Podría tmb sacar la contraseña ds.
  const user = { name: username }; 
  const token = jwt.sign({ user }, process.env.SECRET_KEY);

  console.log('Entre pa aca 2');
  return res.json({
      accessToken: token
  });

})

api.use('/users', verifyToken, usersRouter);
// api.use('/products', playersRouter); //For example another resources on the api

module.exports = api