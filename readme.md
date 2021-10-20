# Node Express demo

## Settings for the cloud database

- In Heroku app provision a JawsDB MySQL database. Create a env variable: DATABASE_URL.

- install config package:
```
npm i config
```

- Create config folder:
  - default.json:
  - custom-environment-variables.json

default.json:
```javascript
{
  "mysql_db": "mysql://localhost:3306/counters?user=counter-app&password=xxxxxxxxx",
  "env": "development"
}
```

custom-environment-variables.json:
```javascript
{
  "mysql_db": "DATABASE_URL",
  "env": "NODE_ENV"
}
```
On Heroku:
- DATABASE_URL is the connection string to JawsDB.
- NODE_ENV is production