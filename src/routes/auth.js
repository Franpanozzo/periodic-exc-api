const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
  const bearerHeader =  req.headers['authorization'];
  if(typeof bearerHeader === 'undefined') return res.sendStatus(401);

  const bearerToken = bearerHeader.split(" ")[1];
  req.token  = bearerToken;

  jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
    if(error) res.sendStatus(403) 
    req.authData = authData;
    next();
  })
}

module.exports = {
  verifyToken,
}
