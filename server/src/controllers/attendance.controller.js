const Attendance = require("../models/Attendance");

// CHECK-IN
exports.checkIn = async (req, res) => {
  const userId = req.user.id;
  const today = new Date().toISOString().split("T")[0];

  const existing = await Attendance.findOne({ userId, date: today });

  if (existing) {
    return res.status(400).json({ message: "Already checked in" });
  }

  const attendance = await Attendance.create({
    userId,
    date: today,
    checkIn: new Date(),
  });

  res.json(attendance);
};

// CHECK-OUT
exports.checkOut = async (req, res) => {
  const userId = req.user.id;
  const today = new Date().toISOString().split("T")[0];

  const attendance = await Attendance.findOne({ userId, date: today });

  if (!attendance) {
    return res.status(400).json({ message: "Check-in first" });
  }

  if (attendance.checkOut) {
    return res.status(400).json({ message: "Already checked out" });
  }

  attendance.checkOut = new Date();

  // Calculate hours
  const hours =
    (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);

  if (hours < 4) attendance.status = "Half-day";

  await attendance.save();

  res.json(attendance);
};

// GET MY ATTENDANCE
exports.getMyAttendance = async (req, res) => {
  const records = await Attendance.find({ userId: req.user.id });
  res.json(records);
};