"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      Food.belongsTo(models.Category, {
        foreignKey: "categoryID",
        as: "category",
      });
      Food.hasMany(models.OrderDetail, {
        foreignKey: "foodID",
        as: "orderDetails",
      });
      Food.hasMany(models.Review, {
        foreignKey: "foodID",
        as: "reviews",
      });
      Food.hasOne(models.BestSeller, {
        foreignKey: "foodID",
        as: "bestSeller",
      });
    }
  }
  Food.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      description: DataTypes.STRING,
      categoryID: DataTypes.INTEGER,
      foodImg: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Food",
      tableName: "foods",
    }
  );
  return Food;
};
