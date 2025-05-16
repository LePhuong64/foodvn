"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    static associate(models) {
      Table.hasOne(models.Order, {
        foreignKey: "tableID", 
        as: "table",
      });

      Table.belongsTo(models.Hall, {
        foreignKey: "hallID",
        as: "hall",
      });
    }
  }
  Table.init(
    {
      tableNumber: DataTypes.INTEGER,
      maxQuantity: DataTypes.INTEGER,
      status: DataTypes.STRING,
      hallID: DataTypes.INTEGER,
      qrCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Table",
    }
  );
  return Table;
};
