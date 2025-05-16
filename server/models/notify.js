"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notify extends Model {
    static associate(models) {
      Notify.belongsTo(models.Employee, {
        foreignKey: "employeeID",
        as: "employee",
      });
      Notify.belongsTo(models.Order, {
        foreignKey: "orderID",
        as: "order",
      });
    }
  }
  Notify.init(
    {
      employeeID: DataTypes.INTEGER,
      orderID: DataTypes.INTEGER,
      message: DataTypes.STRING,
      isRead: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Notify",
    }
  );
  return Notify;
};
