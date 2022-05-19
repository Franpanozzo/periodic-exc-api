const express = require('express');

const usersRouter = require('./users/users.router');

const api = express.Router();

api.use('/users', usersRouter);
// api.use('/products', playersRouter); //For example another resources on the api

module.exports = api