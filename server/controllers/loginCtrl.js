const passport = require("passport");
const jwt = require("jsonwebtoken");

async function loginPost(req, res, next) {
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

      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "5h",
      });
      return res.json({
        user: {
          id: user.id,
          username: user.username,
        },
        token,
      });
    });
  })(req, res, next);
}

module.exports = {
  loginPost,
};
