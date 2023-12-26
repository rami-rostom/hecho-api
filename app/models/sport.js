const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database.js');

class Sport extends Model {}

Sport.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'sport'
});

module.exports = Sport;