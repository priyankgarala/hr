const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getAllEmployees,
  updateSalary,
} = require("../controllers/user.controller");

const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");

router.get("/employees", protect, isAdmin, getAllEmployees);
router.put("/salary/:id", protect, isAdmin, updateSalary);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;