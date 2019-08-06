'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    Post.belongsToMany(models.User, {
      through: "UserVote",
      as: "users",
      foreignKey: "postId"
    });  };
  return Post;
};