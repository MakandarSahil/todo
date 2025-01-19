const express = require("express")
const {userAuth} = require("../middlewares/user.middlewares")
const router = express.Router();

router.get("/todos", userAuth)
router.get("/todo/:id", userAuth)
router.post("todo", userAuth)
router.put("/todo/:id", userAuth)
router.delete("/todos", userAuth)
router.delete("/todos/:id", userAuth)

module.exports = router;