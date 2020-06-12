const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length);
    }
    if (token) {
      jwt.verify(token, "RANDOM_CHARACTER_FOR_N0TES_APP", (err, decoded) => {
        if (err) {
          return res.json("Token is not valid");
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  } catch (error) {
    return res.json("Auth token is not supplied");
  }
};
