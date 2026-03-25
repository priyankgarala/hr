const User = require("../models/User");
const bcrypt = require("bcrypt");

const createAdmin = async () => {
  const exists = await User.findOne({ email: "admin@gmail.com" });

  if (!exists) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      employeeId: "EMP000",
      department: "Management",
    });

    console.log("✅ Admin created");
  } else {
    console.log("⚡ Admin already exists");
  }
};

module.exports = createAdmin;