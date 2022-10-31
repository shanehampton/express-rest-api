var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var config = require("../../config/app.config.js"); // get our config file

function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({
      message: "No token provided",
    });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res.status(401).send({
        message: "Invalid token provided",
      });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
