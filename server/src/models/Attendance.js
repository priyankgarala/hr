const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String, // YYYY-MM-DD
  },
  checkIn: Date,
  checkOut: Date,
  status: {
    type: String,
    enum: ["Present", "Absent", "Half-day"],
    default: "Present",
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);