const express = require("express");
const app = express();
const config = require("config");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//listening on port:
const port = process.env.PORT || 3001;

//host:
const host = config.get("host");

const server = app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});

module.exports = server;
