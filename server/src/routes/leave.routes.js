const express = require("express");
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require("../controllers/leave.controller");

const { protect } = require("../middlewares/auth.middleware");

router.post("/", protect, applyLeave);
router.get("/my", protect, getMyLeaves);

// Admin
router.get("/all", protect, getAllLeaves);
router.put("/:id", protect, updateLeaveStatus);

module.exports = router;