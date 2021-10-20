import dbConfig from "../db_config/db.config.js";
import Sequelize from "sequelize";
import config from "config";
import countersModel from "./counter.model.js";

const db_config = config.get("mysql_db");

const sequelize = new Sequelize(db_config, {
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

db.counters = countersModel(sequelize, Sequelize);

export default db;
