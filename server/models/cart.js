'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Customer, {
        foreignKey: 'customerID',
        as: 'customer',
      });
      Cart.belongsTo(models.Food, {
        foreignKey: 'foodID',
        as: 'food',
      });
    }
  }

  Cart.init(
    {
      customerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      foodID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  );
  
  return Cart;
};
