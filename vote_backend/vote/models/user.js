"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.belongsToMany(models.Post, {
      through: "UserVote",
      as: "posts",
      foreignKey: "userId"
    });
  };
  return User;
};
