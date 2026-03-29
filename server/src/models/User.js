const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // 🔥 UPDATED ROLE
    role: {
      type: String,
      enum: ["employee", "manager", "admin"],
      default: "employee",
    },

    employeeId: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      default: "Not Assigned",
    },

    salary: {
      type: Number,
      default: 0,
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);