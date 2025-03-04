const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

//Handle user signUp
exports.signUp = async (req, res) => {
  const { username, age, gender, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.render("signUp", {
        scsMsg: null,
        errMsg: "User already exists!",
      });
    }

    const user = new User({ username, age, gender, email, password });
    await user.save();

    //create token
    const token = generateToken(user);

    //storing token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None", //for cross-site cookies
    });

    res.render("home", {
      scsMsg: "You have created account successfully!",
      errMsg: null,
      user,
    });
  } catch (error) {
    res.render("home", {
      scsMsg: null,
      errMsg: "Something went wrong try again!",
      user,
    });
  }
};

//Handle user Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //checking user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("signUp", {
        scsMsg: null,
        errMsg: "User not found! Create account",
        user,
      });
    }

    //comparing password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("home", {
        scsMsg: null,
        errMsg: "Invalid password!",
        user,
      });
    }

    //creating and storing token
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true, // 🔴 Important for HTTPS (Use false for localhost)
      sameSite: "None", // 🔴 Required for cross-site cookies
    });
    res.render("home", {
      scsMsg: "Logged in successfully!",
      errMsg: null,
      user,
    });
  } catch (error) {
    res.send("Error: " + error.message);
  }
};

//logout handling
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.render("login", {
    scsMsg: "Logged out successfully!",
    errMsg: null,
    user,
  });
};
