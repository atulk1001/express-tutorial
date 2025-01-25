const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/authController");

router.route("/").post(AuthController.handleLogin);

module.exports = router;
