"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", [
      {
        id: 1,
        title: "Different directories for seed data using sequelize",
        content:"This is ok, but think about the following scenario : you are working on a project with couple of other programmers. They will add some additional quotes and later, you will decide to add another column author. In this case, you have to drop the original table and create new table with the new column. Where is the problem? You will loose all your data. Maybe this is not a problem in devevelopment environment but what you do in production? What if the new feature cause errors and you have to revert it?"
      },
      {
        id: 2,
        title: "Different directories for seed data using sequelize",
        content:"This is ok, but think about the following scenario : you are working on a project with couple of other programmers. They will add some additional quotes and later, you will decide to add another column author. In this case, you have to drop the original table and create new table with the new column. Where is the problem? You will loose all your data. Maybe this is not a problem in devevelopment environment but what you do in production? What if the new feature cause errors and you have to revert it?"
      },
      {
        id: 3,
        title: "Different directories for seed data using sequelize",
        content:"This is ok, but think about the following scenario : you are working on a project with couple of other programmers. They will add some additional quotes and later, you will decide to add another column author. In this case, you have to drop the original table and create new table with the new column. Where is the problem? You will loose all your data. Maybe this is not a problem in devevelopment environment but what you do in production? What if the new feature cause errors and you have to revert it?"
      },
      {
        id: 4,
        title: "Different directories for seed data using sequelize",
        content:"This is ok, but think about the following scenario : you are working on a project with couple of other programmers. They will add some additional quotes and later, you will decide to add another column author. In this case, you have to drop the original table and create new table with the new column. Where is the problem? You will loose all your data. Maybe this is not a problem in devevelopment environment but what you do in production? What if the new feature cause errors and you have to revert it?"
      },
      {
        id: 5,
        title: "Different directories for seed data using sequelize",
        content:"This is ok, but think about the following scenario : you are working on a project with couple of other programmers. They will add some additional quotes and later, you will decide to add another column author. In this case, you have to drop the original table and create new table with the new column. Where is the problem? You will loose all your data. Maybe this is not a problem in devevelopment environment but what you do in production? What if the new feature cause errors and you have to revert it?"
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  }
};
