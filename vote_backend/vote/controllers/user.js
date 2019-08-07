const auth = require("../auth/auth");
const Sequelize = require("sequelize");
const User = require("../models").User;
const UserVote = require("../models").UserVote;

const cookieParser = require("cookie-parser");

exports.login = (req, res) => {
  console.log(req.cookies);
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user => {
      var payload = {
        data1: user.username,
        data2: user.email
      };
      var i = user.username;
      var s = user.email;
      var a = "http://mysoftcorp.in";
      var Options = {
        issuer: i,
        subject: s,
        audience: a
      };
      var token = auth.sign(payload, Options);
      // console.log(token);
      let options = {
        maxAge: new Date(Date.now() + 9999999), // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        secure: true,
        signed: false,
        path: "/"
      };
      res.cookie("access_token", token, options);
      res.cookie("username", user.username, options);
      return res.status(200).send({
        access_token: token,
        username: user.username,
        email: user.email,
        userId: user.id
      });
    })
    .catch(err => {
      return res.status(401).send(err);
    });
};

exports.list = (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.voteUp = (req, res) => {
  UserVote.findOrCreate({
    where: {
      userId: parseInt(req.body.userId),
      postId: parseInt(req.body.postId)
    }
  })
    .then(([uservote, created]) => {
      if (!created) {
        res.status(409).send("conflict");
      } else {
        res.status(201).send("created");
      }
    })
    .catch(err => {
      res.status(404).send("does not exist");
    });
};
