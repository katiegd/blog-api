const db = require("../models/queries");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const validateSignup = [
  body("username")
    .isLength({ min: 5 })
    .withMessage("Please choose a username that has at least 5 characters.")
    .custom(async (username) => {
      const user = await db.findUsername(username);
      if (user) {
        throw new Error("Username already in use.");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  // body("password2").custom((value, { req }) => {
  //   if (value !== req.body.password) {
  //     throw new Error("Passwords do not match.");
  //   }
  //   return true;
  // }),
];

async function signUpUserGet(req, res, next) {
  res.send("Hi you are at the user sign up route.");
}

async function signUpUserPost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array(), data: req.body });
  }

  const username = req.body.username;
  const plainPassword = req.body.password;

  try {
    const password = await bcrypt.hash(plainPassword, 10);
    const user = await db.createUser(username, password);
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Error signing up", errors: err });
  }
}

module.exports = {
  validateSignup,
  signUpUserGet,
  signUpUserPost,
};
