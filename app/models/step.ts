const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database.js');

class Step extends Model {}

Step.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
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
  tableName: 'step'
});

export default Step;