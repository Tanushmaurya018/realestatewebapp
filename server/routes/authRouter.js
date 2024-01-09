const express = require("express");
const { login, signup, google, logOut } = require("../controllers/authController.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);
router.get('/logout', logOut)

module.exports = router;
