'use strict';
const { BOOLEAN } = require('sequelize');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.belongsTo(models.Booking);
    }
  };
  History.init({
    bookingId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};