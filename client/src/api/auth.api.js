import axios from "../utils/axios";

export const registerUser = (data) =>
  axios.post("/auth/register", data);
// 🔥 Login and profile APIs
export const loginUser = (data) =>
  axios.post("/auth/login", data);

export const getProfile = () =>
  axios.get("/user/profile");

export const updateProfile = (data) =>
  axios.put("/user/profile", data);