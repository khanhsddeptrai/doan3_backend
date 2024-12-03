'use strict';
const { BOOLEAN } = require('sequelize');
const {
  Model
} = require('sequelize');
const specialty = require('./specialty');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsTo(models.User);
      Doctor.hasMany(models.Schedule);
      Doctor.belongsTo(models.Specialty);
      Doctor.belongsTo(models.Facility)

    }
  };
  Doctor.init({
    infor: DataTypes.STRING,
    price: DataTypes.FLOAT,
    experience: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER,
    facilityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};