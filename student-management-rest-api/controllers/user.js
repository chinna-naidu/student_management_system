const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secret = require("../middlewears/secret");

exports.login = (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const err = new Error("Invalid Email Address");
        err.element = "email";
        err.status = 406;
        next(err);
      }
      if (user.password != password) {
        const err = new Error("Incorrect password");
        err.element = "password";
        err.status = 406;
        next(err);
      }
      const token = jwt.sign(
        {
          email: email,
          userid: user._id,
        },
        secret
      );
      return res.status(200).json({
        email: email,
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.signup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        const err = new Error("Email already exists.");
        err.element = "email";
        err.status = 406;
        next(err);
      } else {
        const user = new User({
          name: name,
          email: email,
          password: password,
        });
        return user.save();
      }
    })
    .then((data) => {
      return res.status(200).json({
        message: "user created",
        user: data,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
