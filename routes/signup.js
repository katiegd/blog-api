import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("this is the signup route");
});

router.post("/", (req, res) => {
  res.send("signup posted");
});

export default router;
