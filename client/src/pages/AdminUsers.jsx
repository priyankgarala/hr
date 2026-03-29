import { useState } from "react";
import API from "../utils/axios";

function AdminUsers() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const handleCreate = async () => {
    try {
      await API.post("/auth/admin/create-user", form);
      alert("User created successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl mb-4">Admin - Create User</h1>

      <input
        placeholder="Name"
        className="input"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="input"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="input"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      {/* 🔥 Role Selection */}
      <select
        className="input"
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
      </select>

      <button
        onClick={handleCreate}
        className="bg-white text-black px-4 py-2 mt-3"
      >
        Create User
      </button>
    </div>
  );
}

export default AdminUsers;