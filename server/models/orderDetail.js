"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Order, {
        foreignKey: "orderID",
        as: "order",
      });
      OrderDetail.belongsTo(models.Food, {
        foreignKey: "foodID",
        as: "food",
      });
    }
  }
  OrderDetail.init(
    {
      orderID: DataTypes.INTEGER,
      foodID: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL(10, 2),
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
