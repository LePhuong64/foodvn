module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn(
          'Tables',
          'qrCode',
          {
            type: Sequelize.STRING,
            allowNull: true
          }
        ),
      ]);
    },
  
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('Tables', 'qrCode'),
      ]);
    }
  };
  