module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn(
          'OrderDetails',
          'status',
          {
            type: Sequelize.STRING,
            allowNull: false
          }
        ),
      ]);
    },
  
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('OrderDetails', 'status'),
      ]);
    }
  };
  