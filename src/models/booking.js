'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // Booking liên kết với Patient
      Booking.belongsTo(models.Patient, { foreignKey: 'patientId' });

      // Booking liên kết với Schedule
      Booking.belongsTo(models.Schedule, { foreignKey: 'scheduleId' });

      // Booking liên kết với History
      Booking.hasOne(models.History, { foreignKey: 'bookingId' });
    }
  };
  Booking.init({
    status: DataTypes.STRING,
    date: {
      type: DataTypes.DATEONLY
    },
    patientId: {
      type: DataTypes.INTEGER
    },
    scheduleId: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Booking'
  });
  return Booking;
};
