const jwt = require("jsonwebtoken");
const user = require("./models/userModel");

const isLoggedIn = async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    return res.status(401).send("Please authenticate to generate a token");
  }
  try {
    const data = jwt.verify(token, process.env.jwtSec);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Please authenticate to generate a token");
  }
};

const isAdmin = async (req, res, next) => {
  const currUser = await user.findById(req.user.id);
  if (currUser.role != "admin")
    return res.status(401).send("Unauthorized for ingestion");
  next();
};

module.exports = { isLoggedIn, isAdmin };
