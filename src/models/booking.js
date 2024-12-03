'use strict';
const { BOOLEAN } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.hasOne(models.History);
      Booking.hasOne(models.Schedule);

    }
  };
  Booking.init({
    status: DataTypes.STRING,
    date: DataTypes.DATE,

  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};