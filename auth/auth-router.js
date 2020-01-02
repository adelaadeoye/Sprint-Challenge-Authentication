const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./users/user-model.js");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  User.add(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", validateInput, (req, res) => {
  // implement login
  let { username, password } = req.body;

  User.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({
          token,
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials." });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
function validateInput(req, res, next) {
  let { username, password } = req.body;
  if (!username || !password) {
    res.status(404).json({ message: "Username or Password cannot be empty" });
  } else {
    next();
  }
}

function signToken(user) {
  const payload = {
    username: user.username
  };
  const secret = process.env.JWT_SECRET || "keep me secret";
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}
module.exports = router;
