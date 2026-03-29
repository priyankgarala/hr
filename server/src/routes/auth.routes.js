const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const { createUserByAdmin } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");

// Admin create user
router.post("/admin/create-user", protect, isAdmin, createUserByAdmin);

router.post("/register", register);
router.post("/login", login);

module.exports = router;    