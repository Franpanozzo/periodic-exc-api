const express = require('express');
const jwt = require("jsonwebtoken");

const usersRouter = require('./users/users.router');
const { verifyToken } = require('./auth');

const api = express.Router();

api.post('/login', (req, res) => {
  const username = req.body.username; //Podría tmb sacar la contraseña ds.
  const user = { name: username }; 
  const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '10m'});

  return res.json({
      accessToken: token
  });
})

api.use('/users', verifyToken, usersRouter);

module.exports = api