const express = require('express');

const {
  httpGetAllUsers,
  httpGetUser
} = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/:userEmail', httpGetUser);
// playersRouter.get('/:userEmail', httpGetUser);
// playersRouter.post('/', httpAddNewUser);
// playersRouter.delete('/:userEmail', httpDeleteUser);

module.exports = usersRouter;