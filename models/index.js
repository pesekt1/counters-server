const dbConfig = require("../db_config/db.config.js");
const Sequelize = require("sequelize");
const config = require("config");
const db_config = config.get("mysql_db");

const sequelize = new Sequelize(db_config, {
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.counters = require("./counter.model.js")(sequelize, Sequelize);

module.exports = db;
