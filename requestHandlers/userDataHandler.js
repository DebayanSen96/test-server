// userDataHandler.js
const User = require("../schemas/userSchema"); // Assuming the User model is in the 'schemas' file
const mongoose = require("mongoose");

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such manager" });
  }

  const user = await User.find({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const insertUser = async (req, res) => {
  const data = req.body;

  try {
    // Check if the request body is an array
    if (Array.isArray(data)) {
      // Iterate over each user in the array
      const userPromises = data.map(async (user) => {
        const { name, email, phone_number, password } = user;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return { error: `User with email ${email} already exists` };
        } else {
          const newUser = await User.create({
            name,
            email,
            phone_number,
            password
          });
          return newUser;
        }
      });

      const results = await Promise.all(userPromises);

      // Check for errors in the results
      const errors = results.filter(result => result.error);
      const successfulInserts = results.filter(result => !result.error);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Some users could not be created",
          errors,
          createdUsers: successfulInserts
        });
      } else {
        return res.status(201).json({
          message: "All users created successfully",
          users: successfulInserts
        });
      }
    } else {
      // If the request body is not an array, treat it as a single user object
      const { name, email, phone_number, password } = data;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists", existingUser });
      } else {
        const newUser = await User.create({
          name,
          email,
          phone_number,
          password
        });

        return res.status(201).json({
          message: "User created successfully",
          user: newUser
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

module.exports = {
  getUser,
  getUsers,
  insertUser,
  deleteUser,
  updateUser,
};
