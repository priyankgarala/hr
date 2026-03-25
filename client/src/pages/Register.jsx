import { useState } from "react";
import { registerUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <form className="p-6 bg-gray-900 rounded-xl w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4">Register</h2>

        <input
          placeholder="Name"
          className="w-full mb-3 p-2 bg-gray-800"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-2 bg-gray-800"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 bg-gray-800"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-white text-black p-2">
          Register
        </button>
      </form>
    </div>
  );
}