"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Customer, {
        foreignKey: "customerID",
        as: "customer",
      });
      
      Review.belongsTo(models.Food, {
        foreignKey: "foodID",
        as: "food",
      });

      Review.belongsTo(models.Order, {
        foreignKey: "orderID",
        as: "order",
      });
    }
  }

  Review.init(
    {
      customerID: DataTypes.INTEGER,
      foodID: DataTypes.INTEGER,
      orderID: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "reviews",
    }
  );

  return Review;
};
