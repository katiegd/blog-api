const loginRouter = require("./login.js");
const signInRouter = require("./signup.js");
const postRouter = require("./posts.js");
const userRouter = require("./user.js");

const passport = require("passport");

const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("Hi");
});

router.use("/login", loginRouter);
router.use("/signup", signInRouter);
router.use("/posts", postRouter);
router.use(
  "/:username",
  passport.authenticate("jwt", { session: false }),
  userRouter
);
router.post("/logout", (req, res, next) => {
  console.log(req);
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    console.log(req, "Successfully logged out!");
    res.redirect("/");
  });
});

module.exports = router;
