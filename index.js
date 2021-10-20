import express from "express";
import cors from "cors";
import db from "./models/index.js";
import config from "config";

const Counter = db.counters;
const app = express();
//cross origin allowed
app.use(cors({ origin: config.get("origin") }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/counters", (req, res) => {
  //res.header("Access-Control-Allow-Origin", "*");
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
