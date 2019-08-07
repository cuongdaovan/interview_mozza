var express = require("express");
var router = express.Router();
var PostController = require("../controllers").post;
/* GET users listing. */
router.get("/posts", PostController.list);
router.get("/posts/:id", PostController.detail);

module.exports = router;
