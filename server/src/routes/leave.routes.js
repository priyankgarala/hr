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
const { isManager } = require("../middlewares/manager.middleware");
const { managerDecision } = require("../controllers/leave.controller");

// Manager routes
router.put("/manager/:id", protect, isManager, managerDecision);

router.post("/", protect, applyLeave);
router.get("/my", protect, getMyLeaves);

// Admin
router.get("/all", protect, isAdmin, getAllLeaves);
router.put("/:id", protect, isAdmin, updateLeaveStatus);


module.exports = router;