const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcryptjs");
const db = require("../models/db");
require("dotenv").config();

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async function (username, password, cb) {
      try {
        const user = await db.findOne({ username });
        if (!user) {
          return cb(null, false, { message: "Incorrect username." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return cb(null, false, { message: "Incorrect password." });
        }
        return cb(null, user, { message: "Logged in successfully!" });
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, cb) {
      return UserModel.findOneById(jwtPayload.id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
