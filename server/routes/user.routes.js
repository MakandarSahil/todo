const express = require("express")
const {registerValidations, loginValidations} = require("../middlewares/user.middlewares")
const{
    signup,
    login
} = require("../controllers/user.controllers")
const router = express.Router();

router.post("/register", registerValidations, signup);
router.post("/login", loginValidations, login);
router.post("/logout", )

module.exports=router ;