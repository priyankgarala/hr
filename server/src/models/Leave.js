const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: String,
  fromDate: String,
  toDate: String,
  reason: String,

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },

  // 🔥 NEW: Manager approvals
  approvals: [
    {
      managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      decision: {
        type: String,
        enum: ["Approved", "Rejected"],
      },
    },
  ],
});

module.exports = mongoose.model("Leave", leaveSchema);