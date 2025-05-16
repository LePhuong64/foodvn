"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Tables", "hallID", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Halls",
          key: "id",
        },
        onDelete: "CASCADE", 
        onUpdate: "CASCADE",
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Tables", "hallID")]);
  },
};
