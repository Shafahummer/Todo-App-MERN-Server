const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config/keys')


exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array()[0].msg });
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ error: "All fileds are mandatory!" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res.json({ error: "Email id already registered!" });
    } else {
      bcrypt.hash(password, 12, (err, hash) => {
        if (hash) {
          const user = new User({
            email,
            password: hash,
            name,
          });

          user.save((err, user) => {
            if (err) {
              return res.json({
                error: "Not able to save user in DB",
              });
            }
            user.password = undefined
            user.role = undefined
            user.__v = undefined
            res.json({
              message: "Successfully created...",
              data: user,
            });
          });
        } else {
          return res.json({
            error: "Not able to save user in DB",
          });
        }
      });
    }
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array()[0].msg });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ error: "All fileds are mandatory!" });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.json({
        error: "User email does not exist!",
      });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      // result == true
      if (result) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        return res.json({
          message: "Successfully signed in...",
          token
        });
      } else {
        return res.json({ error: "Invalid email or password!" });
      }
    });
  });
};

//middleware
exports.isLoggedIn = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.json({
      error: "No token found!"
    })
  }
  const token = authorization.replace("Bearer ", "")
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.json({
        error: "Access Denied!"
      })
    }
    const { _id } = payload
    User.findById(_id).then(userData => {
      req.user = userData
      next()
    })
  })
}

exports.isAdmin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.json({
      error: "You are not an admin!",
    });
  }
  next();
};

