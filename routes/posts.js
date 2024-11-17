import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("this is the post route");
});

router.post("/", (req, res) => {
  res.send("post posted");
});

export default router;
