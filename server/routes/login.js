const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("this is the login route");
});

router.post("/", (req, res) => {
  res.send("login posted");
});

module.exports = router;
