'use strict';
const { BOOLEAN } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Admin);
      User.hasMany(models.Patient);
      User.hasMany(models.Doctor);
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    sex: DataTypes.STRING,
    phone: DataTypes.STRING,
    userType: DataTypes.INTEGER,
    avatar: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};