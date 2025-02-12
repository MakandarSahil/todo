const express = require("express");
const { registerValidations, loginValidations } = require("../middlewares/user.middlewares");
const { signup, login } = require("../controllers/user.controllers");
const { googleLogin } = require("../controllers/auth.contoller");

const router = express.Router();

router.post("/register", registerValidations, signup);
router.post("/login", loginValidations, login);
router.post("/logout", (req, res) => res.json({ message: "Logout successful" })); 

router.get("/google", googleLogin);

module.exports = router;
