module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn(
          'Orders',
          'total',
          {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
          }
        ),
      ]);
    },
  
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('Orders', 'total'),
      ]);
    }
  };
  