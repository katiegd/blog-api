import loginRouter from "./login.js";
import signInRouter from "./signup.js";
import postRouter from "./posts.js";
import userRouter from "./user.js";

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("hi");
});

router.use("/login", loginRouter);
router.use("/signup", signInRouter);
router.use("/posts", postRouter);
router.use("/user", userRouter);

export default router;
