'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        static associate(models) {
            // Schedule liên kết với Doctor và Timeslot
            Schedule.belongsTo(models.Doctor);
            Schedule.belongsTo(models.Timeslot);

            // Schedule liên kết với Booking
            Schedule.hasMany(models.Booking);
        }
    };
    Schedule.init({
        currentNumber: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        maxNumber: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATEONLY
        },
        doctorId: {
            type: DataTypes.INTEGER
        },
        timeSlotId: {
            type: DataTypes.INTEGER
        },
    }, {
        sequelize,
        modelName: 'Schedule'
    });
    return Schedule;
};
