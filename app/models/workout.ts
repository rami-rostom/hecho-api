const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database.js');

class Workout extends Model {}

Workout.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date_scheduled: {
    type: DataTypes.DATE,
    allowNull: true
  },
  date_accomplished: {
    type: DataTypes.DATE,
    allowNull: true
  },
  distance: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  duration: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  pace: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  hecho: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'workout'
});

export default Workout;

