"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Revenue extends Model {
    static associate(models) {
      Revenue.belongsTo(models.Order, {
        foreignKey: "orderID",
        as: "order",
      });
    }
  }

  Revenue.init(
    {
      orderID: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      week: DataTypes.INTEGER,
      month: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      total: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Revenue",
      tableName: "revenues",
    }
  );

  return Revenue;
};
