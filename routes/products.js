var express = require("express");
var router = express.Router();

module.exports = function (db) {
  router
    .route("/tasks")
    .get((req, res) => {
      res.send(db.get("tasks").value());
    })
    .post((req, res) => {
      const newProduct = req.body;
      res.send(db.get("tasks").insert(newProduct).write());
    });

  router.patch("/tasks/:id", (req, res) => {
    res.send(
      db.get("tasks").find({ id: req.params.id }).assign(req.body).write()
    );
  });

  router.delete("/tasks/:id", (req, res) => {
    db.get("tasks").remove({ id: req.params.id }).write();
    res.status(204).send();
  });

  router.get("/tasks/:id", (req, res) => {
    res.send(db.get("tasks").find({ id: req.params.id }).value());
  });

  return router;
};
