const { Parser } = require('json2csv');

const {
  getAllUsers,
  getUser,
  validateUser,
  saveUser,
  fields
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

// async function httpDeletePlayer(req, res) {
//   if(req.headers['x-api-key'] !== process.env.API_KEY) {
//     return res.status(403).json({
//       forbidden: 'You need a special API KEY to do this operation'
//     })
//   }
//   const playerId = +req.params.playerId;

//   const existsPlayer = await existsPlayerWithId(playerId);
//   if(!existsPlayer) {
//     return res.status(404).json({
//       error: 'Player not found'
//     })
//   }

//   await deletePlayer(playerId);
//   return res.status(200).json({
//     ok: `Player ${playerId} succesfully deleted`
//   })
// }



module.exports = {
  httpGetAllUsers,
  httpGetUser,
  httpAddNewUser,
  httpDownloadUsers
  // httpDeletePlayer
}