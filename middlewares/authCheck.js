const jwt = require("jsonwebtoken");

module.exports = authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    //storing user data in req
    req.user = userData;
    next();
  } catch (error) {
    console.log(error);
  }
};
