const db = require("../models/db");

async function signUpUserGet(req, res, next) {
  res.send("Hi you are at the user sign up route.");
}

async function signUpUserPost(req, res, next) {
  res.send("Hi you just signed up!");
}

module.exports = {
  signUpUserGet,
  signUpUserPost,
};
