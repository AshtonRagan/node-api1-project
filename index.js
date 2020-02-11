// implement your API here
const express = require("express");
const server = express();
const Db = require("./data/db");
server.use(express.json());

server.get("/api/users", (req, res) => {
  Db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => console.log(err));
});

server.get("/api/users/:id", (req, res) => {
  Db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  Db.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(201).json({ user: "Has been removed" });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

server.post("/api/users", (req, res) => {
  const userData = req.body;
  console.log(userData);
  if (userData.name && userData.bio) {
    Db.insert(userData)
      .then(user => {
        res.status(201).json(userData);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
        console.log(err);
      });
  } else {
    console.log("NEEDS SOMETHING");

    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  console.log(userData);
  console.log(id);

  if (userData.name && userData.bio) {
    Db.update(id, userData)
      .then(user => {
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(err => console.log(err));
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

const port = 5000;
server.listen(port, () => console.log("Its running fam"));
