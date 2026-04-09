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

// 🔥 GET MY ATTENDANCE (WITH FILTERS)
exports.getMyAttendance = async (req, res) => {
  try {
    const { day, month, year } = req.query;

    let filter = {
      userId: req.user.id,
    };

    if (year || month || day) {
      let regex = "";

      if (year) regex += year;
      else regex += "\\d{4}";

      if (month) regex += `-${month.padStart(2, "0")}`;
      else if (year) regex += "-\\d{2}";

      if (day) regex += `-${day.padStart(2, "0")}`;

      filter.date = { $regex: `^${regex}` };
    }

    const records = await Attendance.find(filter);

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance" });
  }
};

// 🔥 ADMIN: GET ALL ATTENDANCE (WITH FILTERS)
exports.getAllAttendance = async (req, res) => {
  try {
    const { day, month, year } = req.query;

    let filter = {};

    if (year || month || day) {
      let regex = "";

      if (year) regex += year;
      else regex += "\\d{4}";

      if (month) regex += `-${month.padStart(2, "0")}`;
      else if (year) regex += "-\\d{2}";

      if (day) regex += `-${day.padStart(2, "0")}`;

      filter.date = { $regex: `^${regex}` };
    }

    const records = await Attendance.find(filter)
      .populate("userId", "name employeeId");

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance" });
  }
};