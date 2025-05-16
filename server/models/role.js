'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.Customer, { foreignKey: 'roleID', as: 'customers' });
      Role.hasMany(models.Employee, { foreignKey: 'roleID', as: 'employees' });
    }
  }
  Role.init({
    roleName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};