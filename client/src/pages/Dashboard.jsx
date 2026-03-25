import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-black text-white min-h-screen">
        
        <h1 className="text-2xl mb-6">Dashboard</h1>

        {/* 👤 User Info */}
        <div className="bg-gray-900 p-4 rounded-xl mb-6">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
          <p><b>Employee ID:</b> {user.employeeId}</p>
        </div>

        

      </div>
    </div>
  );
}