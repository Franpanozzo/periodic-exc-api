const {
  getAllUsers
} = require('../../models/users.model');
// const { processQueryParams } = require('../../services/query');

function httpGetAllUsers(req, res) {
  console.log('Entramo')
  // const { skip, limit } = processQueryParams(req.query);
  const users = getAllUsers();
  return res.status(200).json(users);
}

// async function httpAddNewPlayer(req, res) {
//   if(req.headers['x-api-key'] !== process.env.API_KEY) {
//     return res.status(403).json({
//       forbidden: 'You need a special API KEY to do this operation'
//     })
//   }
//   const player = req.body;
//   let errorMessage = null;

//   if(errorMessage = await validatePlayer(player)) {
//     return res.status(400).json({
//       error: errorMessage
//     })
//   }

//   await addNewPlayer(player);
//   return res.status(201).json(player);
// }

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
  // httpAddNewPlayer,
  // httpDeletePlayer
}