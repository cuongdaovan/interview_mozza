"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          username: "cuongd",
          password: "cuong123",
          email: "cuongdaovan262@gmail.com"
        },
        {
          id: 2,
          username: "locthai",
          password: "cuong123",
          email: "loc123@gmail.com"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
