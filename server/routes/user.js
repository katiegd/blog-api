const { Router } = require("express");
const userPostCtrl = require("../controllers/userPostCtrl");

const router = Router();

// Authorization required on this route

router.get("/", (req, res) => {
  res.redirect("/dashboard");
});

router.get("/dashboard", (req, res) => {
  const userData = req.user;
  const user = {
    id: userData.id,
    username: userData.username,
  };
  res.send(user);
});

router.get("/new-post", (req, res) => {
  res.send("this is the new post route");
});

router.post("/new-post", userPostCtrl.newPostPost);

module.exports = router;
