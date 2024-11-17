import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("this is the user route");
});

export default router;
