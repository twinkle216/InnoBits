const jwt = require("jsonwebtoken");

const secretKey = "@#JP";

//Generate tokens
exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    secretKey,
    {
      expiresIn: "1d",
    }
  );
};

//verify token
exports.verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};
