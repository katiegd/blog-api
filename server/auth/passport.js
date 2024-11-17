import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  new LocalStrategy(
    {
      username: "username",
      password: "password",
    },
    function (username, password, cb) {}
  )
);
