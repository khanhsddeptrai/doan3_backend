'use strict';
const { BOOLEAN } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.Patient);
      History.hasOne(models.Booking);


    }
  };
  History.init({
    bookingId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};