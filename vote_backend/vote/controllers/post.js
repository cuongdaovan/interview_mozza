const Sequelize = require("sequelize");
const Post = require("../models").Post;
const UserVote = require("../models").UserVote;
const User = require("../models").User;
const auth = require("../auth/auth");

const Op = Sequelize.Op;

exports.list = (req, res) => {
  return Post.findAll({
    include: [
      {
        model: User,
        as: "users",
        attributes: ["username", "email"],
        required: false,
        through: { attributes: [] }
      }
    ]
  })
    .then(posts => res.status(200).send(posts))
    .catch(error => res.status(400).send(error));
};

exports.detail = (req, res) => {
  console.log(req.params.id);
  return Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: "users",
        attributes: ["username", "email"],
        through: { attributes: [] }
      }
    ]
  })
    .then(post => res.status(200).send(post))
    .catch(error => res.status(400).send(error));
};
