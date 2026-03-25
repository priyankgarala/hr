const express = require("express");
const cors = require("cors");
const createAdmin = require("./config/CreateAdmin");



const app = express();

app.use(cors());
app.use(express.json());

createAdmin();

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/attendance",require("./routes/attendance.routes"));
app.use("/api/leave", require("./routes/leave.routes"));
app.use("/api/users", require("./routes/user.routes"));

module.exports = app;