const {
  getAllUsers,
  getUser
} = require('../../models/users.model');

async function httpGetAllUsers(req, res) {
  // Pense en aplicar paginación, pero capaz si tenemos millones de usuarios lo aplicaría, aca como en el
  //  ejercicio tenemos los mockeados y los que se van creando a traves de request, entonces no lo hago
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
  httpGetUser,
  // httpAddNewPlayer,
  // httpDeletePlayer
}