const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secret = require("../middlewears/secret");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");
  let decodedToken;
  if (!token) {
    throw new Error("token not found");
  }
  try {
    decodedToken = jwt.verify(token, secret);
  } catch (err) {
    throw err;
  }
  if (!decodedToken) {
    throw new Error("not Authenticated");
  }
  console.log(decodedToken);
  User.findById(decodedToken.userid)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
};
