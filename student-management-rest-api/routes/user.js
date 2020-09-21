const { Router } = require("express");

const UserController = require("../controllers/user");

const router = Router();

router.put("/login", UserController.login);

router.post("/signup", UserController.signup);

module.exports = router;
