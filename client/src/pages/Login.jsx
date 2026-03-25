import { useState } from "react";
import { loginUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      await fetchUser();
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="p-6 bg-gray-900 rounded-xl w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          type="email"
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
          Login
        </button>
      </form>
    </div>
  );
}