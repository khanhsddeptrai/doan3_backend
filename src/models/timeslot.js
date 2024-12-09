'use strict';
const { BOOLEAN } = require('sequelize');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Timeslot extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Timeslot.hasMany(models.Schedule);

        }
    };
    Timeslot.init({
        startTime: DataTypes.TIME,
        endTime: DataTypes.TIME,

    }, {
        sequelize,
        modelName: 'Timeslot',
    });
    return Timeslot;
};