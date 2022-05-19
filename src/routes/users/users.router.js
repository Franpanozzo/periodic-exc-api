const express = require('express');

const {
  httpGetAllUsers
} = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/', httpGetAllUsers);
// playersRouter.get('/:userEmail', httpGetUser);
// playersRouter.post('/', httpAddNewUser);
// playersRouter.delete('/:userEmail', httpDeleteUser);

module.exports = usersRouter;