const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database.js');

type WorkoutAttributes = {
  id: number;
  name: string;
  date_scheduled?: string | null;
  date_accomplished?: string | null;
  distance?: number | null;
  duration?: number | null;
  pace?: number | null;
  hecho: boolean;
}

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
    type: DataTypes.DECIMAL,
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

module.exports = Workout;