const express = require("express");
const { model } = require("mongoose");
const { registerUser, authUser } = require("../Controllers/userApi");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);

module.exports = router;
