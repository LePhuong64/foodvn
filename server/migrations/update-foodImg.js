module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('Foods', 'foodImg', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('Foods', 'foodImg', {
        type: Sequelize.JSON, 
        allowNull: true,
      });
    }
  };