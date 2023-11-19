const User = require("../models/userModel");
var jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    const newUser = new User({ email, username, role });
    const user = await User.register(newUser, password);
    const jwtToken = jwt.sign({ user: { id: user._id } }, process.env.jwtSec);
    res.status(201).json({ authToken: jwtToken });
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username } = req.body;
    let user = await User.findOne({ username });
    const jwtToken = jwt.sign({ user: { id: user._id } }, process.env.jwtSec);
    res.status(200).json({ authToken: jwtToken });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { registerUser, loginUser };
