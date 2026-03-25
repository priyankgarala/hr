import { useEffect, useState } from "react";
import API from "../utils/axios";
import Sidebar from "../components/SideBar";

function Attendance() {
  const [records, setRecords] = useState([]);

  const fetchAttendance = async () => {
    const res = await API.get("/attendance");
    setRecords(res.data);
  };

 const handleCheckIn = async () => {
    try {
      await API.post("/attendance/check-in");
      alert("Checked in successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleCheckOut = async () => {
    try {
      await API.post("/attendance/check-out");
      alert("Checked out successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar />
    <div className="flex-1 p-6 bg-black text-white min-h-screen">
      
      <h1 className="text-2xl mb-4">Attendance</h1>

      <div className="flex gap-4 mb-6">
          <button
            onClick={handleCheckIn}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Check In
          </button>

          <button
            onClick={handleCheckOut}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Check Out
          </button>
        </div>
        <div>
            <button onClick={fetchAttendance} className="bg-gray-500 px-4 py-2 rounded">
              Refresh Records
            </button>
        </div>

      {records.map((r) => (
        <div key={r._id} className="bg-gray-900 p-3 mb-2 rounded">
          <p>Date: {r.date}</p>
          <p>Status: {r.status}</p>
          <p>Check In: {r.checkIn}</p>
          <p>Check Out: {r.checkOut}</p>

        
        </div>
      ))}
    </div>
    </div>
  );
}

export default Attendance;