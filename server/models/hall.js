"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hall extends Model {
    static associate(models) {
     
      Hall.hasMany(models.Table, {
        foreignKey: "hallID",
        as: "tables",
      });
    }
  }

  Hall.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Hall",
    }
  );
  return Hall;
};
