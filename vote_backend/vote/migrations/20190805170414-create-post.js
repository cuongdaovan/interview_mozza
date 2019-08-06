"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW")
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW")
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Posts");
  }
};
