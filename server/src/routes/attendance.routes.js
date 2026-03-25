const express = require("express");
const router = express.Router();
const {
  checkIn,
  checkOut,
  getMyAttendance,
} = require("../controllers/attendance.controller");

const { protect } = require("../middlewares/auth.middleware");

router.post("/check-in", protect, checkIn);
router.post("/check-out", protect, checkOut);
router.get("/", protect, getMyAttendance);

module.exports = router;