const User = require("../models/User");


// GET PROFILE
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  const updates = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    updates,
    { new: true }
  ).select("-password");

  res.json(user);
};



exports.getAllEmployees = async (req, res) => {
  try {
    const users = await User.find({ role: "employee" })
      .select("name email employeeId salary");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.updateSalary = async (req, res) => {
  try {
    const { salary } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { salary },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error updating salary" });
  }
};