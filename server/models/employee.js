"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.Role, {
        foreignKey: "roleID",
        as: "role",
      });
      Employee.hasMany(models.Notify, {
        foreignKey: "employeeID",
        as: "notifies",
      });
      Employee.hasMany(models.Order, {
        foreignKey: "employeeID",
        as: "orders",
      });
    }
  }
  Employee.init(
    {
      employeeName: DataTypes.STRING,
      roleID: DataTypes.INTEGER,
      password: DataTypes.STRING,
      employeePhone: DataTypes.STRING,
      employeeImg: DataTypes.STRING,
      employeeGender: DataTypes.STRING,
      fcmToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
