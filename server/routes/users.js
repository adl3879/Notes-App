const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          display: user.email,
          message: "User is added successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password"),
            });
          }
          const payload = {
            id: user._id,
            userData: user,
          };
          //token...
          const token = jwt.sign(payload, "RANDOM_CHARACTER_FOR_N0TES_APP", {
            expiresIn: "24h",
          });

          res.status(201).json({
            display: user.email,
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

router.get("/getusers", (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

module.exports = router;
