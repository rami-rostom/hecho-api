"use strict";
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.PG_URL, {
    dialect: 'postgres',
    define: { underscored: true },
    timezone: 'Europe/Paris',
});
module.exports = sequelize;
