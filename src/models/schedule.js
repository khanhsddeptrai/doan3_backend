'use strict';
const { BOOLEAN } = require('sequelize');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Schedule.belongsTo(models.Doctor);
            Schedule.belongsTo(models.Booking);
            Schedule.belongsTo(models.Timeslot);
        }
    };
    Schedule.init({
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.DATE,
        doctorId: DataTypes.INTEGER,
        bookingId: DataTypes.INTEGER,
        timeSlotId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};