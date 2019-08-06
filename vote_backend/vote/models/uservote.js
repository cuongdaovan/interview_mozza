"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserVote = sequelize.define(
    "UserVote",
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER
    },
    {}
  );
  UserVote.associate = function(models) {
    // associations can be defined here
  };
  UserVote.removeAttribute("id");

  return UserVote;
};
