const Sequelize = require("sequelize");
const Post = require("../models").Post;
const UserVote = require("../models").UserVote;
const User = require("../models").User;
const auth = require("../auth/auth");

const Op = Sequelize.Op;

exports.list = (req, res) => {
  return Post.findAll({ include: [{ model: User, as: "users" }] })
    .then(posts => res.status(200).send(posts))
    .catch(error => res.status(400).send(error));
};
exports.login = (req, res) => {
  var payload = {
    data1: "Data 1",
    data2: "Data 2",
    data3: "Data 3",
    data4: "Data 4"
  };
  var i = "Mysoft corp";
  var s = "some@user.com";
  var a = "http://mysoftcorp.in";
  var Options = {
    issuer: i,
    subject: s,
    audience: a
  };
  var token = auth.sign(payload, Options);
  res.status(200).send(token);
};
