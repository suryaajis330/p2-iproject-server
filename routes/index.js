const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();
const musicRouter = require("./musicRouter");
const { authN } = require("../middlewares/auth");
const errors = require("../middlewares/errors");
const createAvatar = require("../middlewares/avatar");

router.post("/register", createAvatar, AuthController.register);
router.post("/login", AuthController.login);
router.post("/loginGoogle", createAvatar, AuthController.loginGoogle);

router.use(authN);
router.use("/music", musicRouter);

router.use(errors);

module.exports = router;
