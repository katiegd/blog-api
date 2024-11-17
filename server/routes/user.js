const { Router } = require("express");

const router = Router();

// Authorization required on this route

router.get("/dashboard", (req, res) => {
  res.send("this is the user route");
});

router.get("/new-post", (req, res) => {
  res.send("this is the new post route");
});

router.post("/new-post", (req, res) => {
  res.send("new post posted!");
});

module.exports = router;
