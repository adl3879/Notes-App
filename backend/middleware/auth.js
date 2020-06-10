const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : req.headers.authorization;

    const decodedToken = jwt.verify(token, "RANDOM_CHARACTER_FOR_N0TES_APP");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user IB";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request"),
    });
  }
};
