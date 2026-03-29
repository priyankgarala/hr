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

exports.managerDecision = async (req, res) => {
  const { decision } = req.body; // Approved / Rejected
  const managerId = req.user.id;

  const leave = await Leave.findById(req.params.id);

  if (!leave) {
    return res.status(404).json({ message: "Leave not found" });
  }

  // ❌ Prevent duplicate decision
  const already = leave.approvals.find(
    (a) => a.managerId.toString() === managerId
  );

  if (already) {
    return res.status(400).json({ message: "Already decided" });
  }

  // ✅ Add decision
  leave.approvals.push({ managerId, decision });

  // 🔥 Count approvals
  const approvals = leave.approvals.filter(
    (a) => a.decision === "Approved"
  ).length;

  const rejections = leave.approvals.filter(
    (a) => a.decision === "Rejected"
  ).length;

  // 🔥 Logic
  if (approvals >= 2) {
    leave.status = "Approved";
  }

  if (rejections >= 2) {
    leave.status = "Rejected";
  }

  await leave.save();

  res.json(leave);
};