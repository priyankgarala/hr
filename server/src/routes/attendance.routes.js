const express = require("express");
const router = express.Router();
const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
} = require("../controllers/attendance.controller");
const { isAdmin } = require("../middlewares/admin.middleware");



const { protect } = require("../middlewares/auth.middleware");

router.post("/check-in", protect, checkIn);
router.post("/check-out", protect, checkOut);
router.get("/", protect, getMyAttendance);
router.get("/all", protect, isAdmin, getAllAttendance);

module.exports = router;