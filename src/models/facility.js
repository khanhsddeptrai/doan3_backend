'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Facility extends Model {
        static associate(models) {
            Facility.hasMany(models.Doctor, {
                foreignKey: 'facilityId', 
                as: 'doctors' 
            });
        }
    }

    Facility.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true, 
                }
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                validate: {
                    isNumeric: true, 
                }
            }
        },
        {
            sequelize,
            modelName: 'Facility',
            tableName: 'Facility', 
            timestamps: true 
        }
    );

    return Facility;
};
