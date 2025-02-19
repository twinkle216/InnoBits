const User = require("../models/user");
const bcrypt = require("bcryptjs");
const path = require("path");
const { generateToken } = require("../utils/jwt");

//Handle user signUp
exports.signUp = async (req, res) => {
  const { username, age, gender, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User already exists!");
    }

    const user = new User({ username, email, country, state, city, password });
    await user.save();

    //create token
    const token = generateToken(user);

    //send token to frontend
    res.status(200).json({token});

    res.sendFile(path.join(__dirname, "..", "views", "html", "index.html"));
  } catch (error) {
    res.status(500).send("Error" + error.message);
  }
};

//Handle user Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //checking user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found!");
    }

    //compare password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("invalid password!");
    }

    const token = generateToken(user);

    //successful login
    res.sendFile(path.join(__dirname, "..", "views", "html", "index.html"));
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};
