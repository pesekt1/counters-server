# Node Express demo

## Connecting to MySQL

install dependencies:
```
yarn add sequelize
yarn add mysql2
yarn add cors
yarn add config
```

- db config:
```javascript
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123456",
  DB: "counters",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
```

- models/counter.model.js:
```javascript
module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "counter",
    {
      value: {
        type: Sequelize.INTEGER,
      },
      liked: {
        type: Sequelize.BOOLEAN,
      },
    },
    { createdAt: false, updatedAt: false }
  );
};
```

We set createAt and updateAt to false because we dont want to have it in the database schema.


- models/index.js: setting up the db object
```javascript
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
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
```

- Getting data from the database
```javascript
app.get("/api/counters", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  Counter.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving counters.",
      });
    });
});
```

- The same for all CRUD operations...