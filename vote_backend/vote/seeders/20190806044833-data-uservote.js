"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "UserVotes",
      [
        {
          userId: 1,
          postId: 1
        },
        {
          userId: 1,
          postId: 2
        },
        {
          userId: 2,
          postId: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserVotes", null, {});
  }
};
