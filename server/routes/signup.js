const { Router } = require("express");
const signUpController = require("../controllers/signup");

const router = Router();

router.get("/", signUpController.signUpUserGet);

router.post("/", signUpController.signUpUserPost);

module.exports = router;