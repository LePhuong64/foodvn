module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn(
          'Customers',
          'customerImg',
          {
            type: Sequelize.STRING,
            allowNull: true
          }
        ),
        queryInterface.addColumn(
          'Employees',
          'employeeImg',
          {
            type: Sequelize.STRING,
            allowNull: true
          }
        ),
        queryInterface.addColumn(
          'Foods',
          'foodImg',
          {
            type: Sequelize.JSON,
            allowNull: true
          }
        ),
      ]);
    },
  
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('Customers', 'customerImg'),
        queryInterface.removeColumn('Employees', 'employeeImg'),
        queryInterface.removeColumn('Foods', 'foodImg'),
      ]);
    }
  };
  