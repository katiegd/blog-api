const { Router } = require("express");
const signUpController = require("../controllers/signupCtrl");

const router = Router();

router.get("/", signUpController.signUpUserGet);

router.post(
  "/",
  signUpController.validateSignup,
  signUpController.signUpUserPost
);

module.exports = router;
