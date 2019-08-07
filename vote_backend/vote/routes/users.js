var express = require("express");
var router = express.Router();
var UserController = require("../controllers/user");

/* GET users listing. */
router.get("/users", UserController.list);
router.post("/login", UserController.login);
router.post("/uservote", UserController.voteUp);

module.exports = router;
