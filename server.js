const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const {
  getManagers,
  insertManager,
  deleteManager,
  updateManager,
  getManager,
} = require("./requestHandlers/mangerDataHandler");
const {
  getUser,
  getUsers,
  insertUser,
  deleteUser,
  updateUser,
  userLoginHandler,
} = require("./requestHandlers/userDataHandler");

const User = require("./schemas/userSchema");
const Manager = require("./schemas/managerSchema");
const Turf = require("./schemas/turfSchema");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://Debayan96:Deba9774@cluster0.rd7mq.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to db & Listening on port", port);
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((e) => {
    console.log(e);
  });

//fucntion to login

//GET specific manager
app.get("/get/user/:id", getUser);
app.get("/get/manager/:id", getManager);

// GET request handler for the root URL
app.get("/users", getUsers);
app.get("/managers", getManagers);

// POST request handler to insert a new user
app.post("/insert/user", insertUser);
app.post("/insert/manager", insertManager);

//POST request for login with user entered data
app.post("/login", userLoginHandler);

// POST request handler to insert a new user
app.delete("/delete/user/:id", deleteUser);
app.delete("/delete/manager/:id", deleteManager);

// POST request handler to insert a new user
app.patch("/update/user/:id", updateUser);
app.patch("/update/manager/:id", updateManager);
