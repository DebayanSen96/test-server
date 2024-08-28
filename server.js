const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors')
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
} = require("./requestHandlers/userDataHandler");

const User = require("./schemas/userSchema");
const Manager = require("./schemas/managerSchema");
const Turf = require('./schemas/turfSchema')

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors())

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
const loginHandler = async (req, res) => {
  const { email, phoneNumber } = req.body;

  const user = await User.findOne({ email: email, phone_number: phoneNumber});
  if (user) {
    res.status(200).json({ isValid: true, userID: user._id });
  } else {
    res.status(200).json({ isValid: false, userID: null });
  }
};

//GET specific manager
app.get("/get/user/:id", getUser)
app.get("/get/manager/:id", getManager)


// GET request handler for the root URL
app.get("/users", getUsers);
app.get("/managers", getManagers);

// POST request handler to insert a new user
app.post("/insert/user", insertUser);
app.post("/insert/manager", insertManager);

//POST request for login with user entered data
app.post("/login", loginHandler);

// POST request handler to insert a new user
app.delete("/delete/user/:id", deleteUser);
app.delete("/delete/manager/:id", deleteManager);


// POST request handler to insert a new user
app.patch("/update/user/:id", updateUser);
app.patch("/update/manager/:id", updateManager);

