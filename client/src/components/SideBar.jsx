import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../utils/axios";


function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, user } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // 🔥 Active route highlight
  const isActive = (path) => location.pathname === path;
// 🔥 Attendance actions
  
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col justify-between">
      
      <div>
        <h2 className="text-xl mb-6">HRMS</h2>

        {user && (
          <div className="mb-6 p-3 bg-gray-800 rounded">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-400">{user.role}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">

          <button
            onClick={() => navigate("/dashboard")}
            className={`btn ${isActive("/dashboard") && "bg-white text-black"}`}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/profile")}
            className={`btn ${isActive("/profile") && "bg-white text-black"}`}
          >
            Profile
          </button>

          <button
            onClick={() => navigate("/attendance")}
            className={`btn ${isActive("/attendance") && "bg-white text-black"}`}
          >
            Attendance
          </button>
{user?.role != "admin" && (
          <button
            onClick={() => navigate("/leave")}
            className={`btn ${isActive("/leave") && "bg-white text-black"}`}
          >
            Leave
          </button>
)}
          {user?.role === "admin" && (
          <button
          onClick={() => navigate("/admin/leaves")}
          className={`btn ${isActive("/admin/leaves") && "bg-white text-black"}`}
          >
            Manage Leaves
  </button>

  
)}

        </div>
      </div>

      {/* Bottom Section */}
      <button
        onClick={logout}
        className="bg-red-500 p-2 rounded mt-6 hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;