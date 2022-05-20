const { Parser } = require('json2csv');

const {
  getAllUsers,
  getUser,
  validateUser,
  saveUser,
  fields,
  deleteUser,
  updateUser
} = require('../../models/users.model');

async function httpGetAllUsers(req, res) {
  const users = await getAllUsers();
  return res.status(200).json(users);
}

async function httpGetUser(req, res) {
  const userEmail = req.params.userEmail;

  const user = await getUser(userEmail);
  if(!user) {
    return res.status(404).json({
      error: 'User not found'
    })
  }

  res.status(200).json(user);
}

async function httpAddNewUser(req, res) {
  const user = req.body;
  let errorMessage = null;

  if(errorMessage = await validateUser(user)) {
    return res.status(400).json({
      error: errorMessage
    })
  }

  await saveUser(user);
  return res.status(201).json(user);
}

async function httpDownloadUsers(req, res) {
  const usersData = await getAllUsers();

  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(usersData);
  res.header('Content-Type', 'text/csv');
  res.attachment('users.csv');
  return res.send(csv);
}

async function httpDeleteUser(req, res) {
  const userEmail = req.params.userEmail;

  const user = await getUser(userEmail);
  if(!user) {
    return res.status(404).json({
      error: 'User not found'
    })
  }

  await deleteUser(userEmail);
  res.status(200).json({
    ok: `User with email ${userEmail} succesfully deleted`
  });
}

async function httpUpdateUser(req, res) {
  const userEmail = req.params.userEmail;
  const userData = req.body;
  if(typeof userEmail !== 'string') {
    return res.status(400).json({
      error: 'must receive an email and as a string type'
    })
  }

  const user = await getUser(userEmail);
  if(!user) {
    return res.status(404).json({
      error: 'User not found'
    })
  }

  await updateUser(userEmail, userData);
  res.status(200).json({
    ok: `User with email ${userEmail} succesfully updated`
  });
}


module.exports = {
  httpGetAllUsers,
  httpGetUser,
  httpAddNewUser,
  httpDownloadUsers,
  httpDeleteUser,
  httpUpdateUser
}