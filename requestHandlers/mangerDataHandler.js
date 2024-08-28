// userDataHandler.js
const Manager = require("../schemas/managerSchema"); // Assuming the Manager model is in the 'schemas' file
const mongoose = require("mongoose");



const getManager = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such manager" });
  }

  const manager = await Manager.find({ _id: id });

  if (!manager) {
    return res.status(404).json({ error: "No such manager" });
  }

  res.status(200).json(manager);
};

const getManagers = async (req, res) => {
  try {
    const managers = await Manager.find({});
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch managers" });
  }
};

const insertManager = async (req, res) => {
  const {
    id,
    name,
    email,
    phone_number,
    city,
    payment_info,
    turfs_owned,
    turf_count,
  } = req.body;

  try {
    const existingManager = await Manager.findOne({ id });

    if (existingManager) {
      return res.status(400).json({ message: "Manager ID already exists" });
    }

    const newManager = await Manager.create({
      id,
      name,
      email,
      phone_number,
      city,
      payment_info,
      turfs_owned,
      turf_count,
    });

    res
      .status(201)
      .json({ message: "Manager created successfully", manager: newManager });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteManager = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such manager" });
  }

  const manager = await Manager.findOneAndDelete({ _id: id });

  if (!manager) {
    return res.status(404).json({ error: "No such manager" });
  }

  res.status(200).json(manager);
};

const updateManager = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such manager" });
  }

  const manager = await Manager.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!manager) {
    return res.status(404).json({ error: "No such manager" });
  }

  res.status(200).json(manager);
};

module.exports = {
  getManager,
  getManagers,
  insertManager,
  deleteManager,
  updateManager,
};
