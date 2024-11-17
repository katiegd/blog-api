const loginRouter = require("./login.js");
const signInRouter = require("./signup.js");
const postRouter = require("./posts.js");
const userRouter = require("./user.js");

const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("hi");
});

router.use("/login", loginRouter);
router.use("/signup", signInRouter);
router.use("/posts", postRouter);
router.use("/:username", userRouter);

module.exports = router;
