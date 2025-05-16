"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BestSeller extends Model {
    static associate(models) {
      BestSeller.belongsTo(models.Food, {
        foreignKey: "foodID",
        as: "food",
      });
    }
  }

  BestSeller.init(
    {
      foodID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      orderCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "BestSeller",
    }
  );

  return BestSeller;
};
