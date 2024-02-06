"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database.js');
class Tag extends Model {
}
Tag.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'tag'
});
exports.default = Tag;
