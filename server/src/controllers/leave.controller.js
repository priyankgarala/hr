const Leave = require("../models/Leave");

// APPLY LEAVE
exports.applyLeave = async (req, res) => {
  const leave = await Leave.create({
    userId: req.user.id,
    ...req.body,
  });

  res.json(leave);
};

// GET MY LEAVES
exports.getMyLeaves = async (req, res) => {
  const leaves = await Leave.find({ userId: req.user.id });
  res.json(leaves);
};

// ADMIN: GET ALL
exports.getAllLeaves = async (req, res) => {
  const leaves = await Leave.find().populate("userId", "name email");
  res.json(leaves);
};

// ADMIN: APPROVE / REJECT
exports.updateLeaveStatus = async (req, res) => {
  const { status } = req.body;

  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(leave);
};