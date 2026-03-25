const express = require("express");
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require("../controllers/leave.controller");

const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");

router.post("/", protect, applyLeave);
router.get("/my", protect, getMyLeaves);

// Admin
router.get("/all", protect, isAdmin, getAllLeaves);
router.put("/:id", protect, isAdmin, updateLeaveStatus);

module.exports = router;