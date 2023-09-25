const User = require("../models/user");

exports.userSignup = (req, res) => {
  let { email, password, firstName, lastName } = req.body;

  const userObj = new User({
    email: email ? email : undefined,
    password: password ? password : undefined,
    firstName: firstName ? firstName : undefined,
    lastName: lastName ? lastName : undefined,
  });

  User.find({
    email: email,
    password: password,
  })
    .then((result) => {
      if (result.length > 0) {
        res.status(400).json({
          message: "User already registered.",
        });
      } else {
        userObj.save().then((response) => {
          res.status(200).json({
            message: "User registered successfully",
            user: response,
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server Error",
        error: error,
      });
    });
};

exports.userLogin = (req, res) => {
  let { email, password } = req.body;

  User.find({
    email: email,
    password: password,
  })
    .then((response) => {
      if (response.length > 0) {
        res.status(200).json({
          message: "User Validated Successfully.",
          user: response,
        });
      } else {
        res.status(400).json({
          message: "Could not validate user.",
          user: response,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server Error",
        error: error,
      });
    });
};
