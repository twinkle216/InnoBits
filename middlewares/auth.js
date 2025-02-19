const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied. No token provided!");
  }
  try {
    const verified = verifyToken(token);
    req.user = verified;
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
