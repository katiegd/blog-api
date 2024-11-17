const { Router } = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
require("../auth/passport");

const router = Router();

router.get("/", (req, res) => {
  res.send("this is the login route");
});

router.post("/", function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res, next);
});

module.exports = router;
