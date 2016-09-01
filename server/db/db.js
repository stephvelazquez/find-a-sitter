var Sequelize = require('sequelize');
var config = require('./env/config.js')['mysql'];

var sequelize = new Sequelize(
  config.databaseName,
  config.userName,
  config.password, {
    host: config.host,
    port: config.port,
    dialect: congif.dialect
  }
);
