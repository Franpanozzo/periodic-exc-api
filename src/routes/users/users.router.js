const express = require('express');

const {
  httpGetAllUsers,
  httpGetUser,
  httpAddNewUser,
  httpDownloadUsers,
  httpDeleteUser,
  httpUpdateUser
} = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/',httpGetAllUsers);
usersRouter.get('/download', httpDownloadUsers);
usersRouter.get('/:userEmail', httpGetUser);
usersRouter.post('/', httpAddNewUser);
usersRouter.delete('/:userEmail', httpDeleteUser);
usersRouter.patch('/:userEmail', httpUpdateUser);

module.exports = usersRouter;