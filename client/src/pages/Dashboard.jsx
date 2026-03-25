import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/axios";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);


  if (!user) return <div className="text-white">Loading...</div>;
  

const fetchEmployees = async () => {
  try {
    const res = await API.get("/users/employees");
    setEmployees(res.data);
  } catch (err) {
    console.log(err);
  }
};



const updateSalary = async (id, salary) => {
  try {
    await API.put(`/users/salary/${id}`, { salary });
    fetchEmployees();
  } catch (err) {
    alert("Error updating salary");
  }
};
useEffect(() => {
  if (user?.role === "admin") {
    fetchEmployees();
  }
}, [user]);

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

        
{user.role === "admin" && (
  <div className="mt-8">
    <h2 className="text-xl mb-4">Employees</h2>

    <div className="grid gap-4">
      {employees.map((emp) => (
        <div key={emp._id} className="bg-gray-900 p-4 rounded">

          <p><b>Name:</b> {emp.name}</p>
          <p><b>Email:</b> {emp.email}</p>
          <p><b>Employee ID:</b> {emp.employeeId}</p>

          <div className="flex gap-3 mt-3">
            <input
              type="number"
              placeholder="Update Salary"
              className="input"
              onChange={(e) =>
                (emp.newSalary = e.target.value)
              }
            />

            <button
              onClick={() => updateSalary(emp._id, emp.newSalary)}
              className="bg-green-500 px-3 py-1"
            >
              Save
            </button>
          </div>

          <p className="mt-2">Current Salary: ₹{emp.salary}</p>
        </div>
      ))}
    </div>
  </div>
)}
      </div>
      
    </div>
  );
}