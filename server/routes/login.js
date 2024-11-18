const { Router } = require("express");
require("dotenv").config();
require("../auth/passport");

const router = Router();
const loginController = require("../controllers/loginCtrl");

router.get("/", (req, res) => {
  res.send("this is the login route");
});

router.post("/", loginController.loginPost);

module.exports = router;
