"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database.js');
class Goal extends Model {
}
Goal.init({
    activity: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    distance: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    duration: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'goal'
});
exports.default = Goal;
