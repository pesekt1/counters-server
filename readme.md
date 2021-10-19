# Node Express demo

## Counters APIs
Using fake data - stored in an array. There is no database yet.

```javascript
const cors = require("cors");

//cross origin allowed
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let counters = [
  { id: 1, value: 0, liked: false },
  { id: 2, value: 0, liked: false },
  { id: 3, value: 0, liked: false },
  { id: 4, value: 0, liked: false },
];

//API with fake data - mocking the database
app.get("/api/counters", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(counters);
});

app.delete("/api/counters", (req, res) => {
  counters = [];
  res.status(200).send("all deleted");
});

app.delete("/api/counters/:id", (req, res) => {
  let deletedCounter = counters.find((c) => c.id == req.params.id);
  const index = counters.indexOf(deletedCounter);
  counters.splice(index, 1);
  res.send(deletedCounter);
});

app.post("/api/counters", (req, res) => {
  const newId = counters.length ? counters[counters.length - 1].id + 1 : 1;
  const newCounter = { id: newId, value: 0, liked: false };
  counters.push(newCounter);
  res.send(newCounter);
});

app.put("/api/counters/:id", (req, res) => {
  const counter = req.body;
  const counterInDb = counters.find((c) => c.id === counter.id);
  const index = counters.indexOf(counterInDb);
  counters.splice(index, 1, counter);
  res.send(counter);
});

app.put("/api/counters/", (req, res) => {
  counters.map((c) => {
    c.value = 0;
  });
  res.send(counters);
});
```