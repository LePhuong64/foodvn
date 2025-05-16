"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsTo(models.Role, {
        foreignKey: "roleID",
        as: "role",
      });
      Customer.hasMany(models.Order, {
        foreignKey: "customerID",
        as: "orders",
      });
      Customer.hasMany(models.Review, {
        foreignKey: "customerID",
        as: "reviews",
      });
    }
  }
  Customer.init(
    {
      customerName: DataTypes.STRING,
      roleID: DataTypes.INTEGER,
      password: DataTypes.STRING,
      customerPhone: DataTypes.STRING,
      customerEmail: DataTypes.STRING,
      customerBirthday: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
