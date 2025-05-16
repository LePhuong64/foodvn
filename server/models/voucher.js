"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    static associate(models) {
      Voucher.hasOne(models.Order, {
        foreignKey: "voucherID", 
        as: "order",
      });
    }
  }
  Voucher.init(
    {
      code: DataTypes.STRING,
      voucherName: DataTypes.STRING,
      discount: DataTypes.DECIMAL(10, 2),
      exDate: DataTypes.DATE,
      startDate: DataTypes.DATE,
      isActivated: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Voucher",
    }
  );
  return Voucher;
};
