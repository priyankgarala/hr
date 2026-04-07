const express = require("express");
const router = express.Router();
const { chatWithAI } = require("../controllers/chat.controller");
const { protect } = require("../middlewares/auth.middleware");

router.post("/", protect, chatWithAI);

module.exports = router;