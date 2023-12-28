const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database.js');

class Tag extends Model {}

Tag.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'tag'
});

export default Tag;