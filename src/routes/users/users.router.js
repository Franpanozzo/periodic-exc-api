const express = require('express');

const {
  httpGetAllUsers,
  httpGetUser,
  httpAddNewUser,
  httpDownloadUsers
} = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/',httpGetAllUsers);
usersRouter.get('/download', httpDownloadUsers);
usersRouter.get('/:userEmail', httpGetUser);
usersRouter.post('/', httpAddNewUser);
// playersRouter.delete('/:userEmail', httpDeleteUser);

module.exports = usersRouter;