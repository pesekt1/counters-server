const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//API with fake data - mocking the database
app.get("/api/counters", (req, res) => {
  res.send([
    { id: 1, value: 0, liked: false },
    { id: 2, value: 0, liked: false },
    { id: 3, value: 0, liked: false },
  ]);
});
//
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
