const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const Counter = db.counters;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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

app.delete("/api/counters", (req, res) => {
  Counter.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} counters were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occurred while removing counters.",
      });
    });
});

app.delete("/api/counters/:id", (req, res) => {
  const id = req.params.id;

  Counter.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "counter was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete counter with id=${id}. Maybe counter was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete counter with id=" + id,
      });
    });
});

app.post("/api/counters", (req, res) => {
  // Create a Tutorial
  const counter = {
    value: 0,
    liked: 0,
  };

  Counter.create(counter)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occurred while creating the counter.",
      });
    });
});

app.put("/api/counters/:id", (req, res) => {
  const id = req.params.id;

  Counter.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "counter was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update counter with id=${id}. Maybe counter was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating counter with id=" + id,
      });
    });
});

app.put("/api/counters/", (req, res) => {
  Counter.update({ value: 0 }, { where: {} })
    .then(() => {
      Counter.findAll().then((data) => {
        res.send(data);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error reseting counters.",
      });
    });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
