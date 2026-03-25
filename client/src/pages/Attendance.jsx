import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useAuth } from "../context/AuthContext";

function Attendance() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [filters, setFilters] = useState({
  day: "",
  month: "",
  year: "",
});

  const fetchAttendance = async () => {
  try {
    const query = new URLSearchParams(filters).toString();

    const url =
      user.role === "admin"
        ? `/attendance/all?${query}`
        : `/attendance?${query}`;

    const res = await API.get(url);
    setRecords(res.data);
  } catch (err) {
    console.log(err);
  }
};

  const checkIn = async () => {
    await API.post("/attendance/check-in");
    fetchAttendance();
  };

  const checkOut = async () => {
    await API.post("/attendance/check-out");
    fetchAttendance();
  };

  useEffect(() => {
    if (user) fetchAttendance();
  }, [user]);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl mb-4">Attendance</h1>

      <div className="flex gap-3 mb-4 flex-wrap">
  
  <input
    type="number"
    placeholder="Day"
    className="input w-24"
    onChange={(e) =>
      setFilters({ ...filters, day: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Month"
    className="input w-24"
    onChange={(e) =>
      setFilters({ ...filters, month: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Year"
    className="input w-32"
    onChange={(e) =>
      setFilters({ ...filters, year: e.target.value })
    }
  />

  <button
    onClick={fetchAttendance}
    className="bg-white text-black px-4 py-2"
  >
    Apply
  </button>

  <button
    onClick={() => {
      setFilters({ day: "", month: "", year: "" });
      fetchAttendance();
    }}
    className="bg-gray-700 px-4 py-2"
  >
    Reset
  </button>

</div>

      {/* ✅ ONLY FOR EMPLOYEE */}
      {user.role !== "admin" && (
        <div className="flex gap-3 mb-4">
          <button onClick={checkIn} className="bg-green-500 px-4 py-2">
            Check In
          </button>

          <button onClick={checkOut} className="bg-blue-500 px-4 py-2">
            Check Out
          </button>
        </div>
      )}

      {/* 🔥 TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-900 rounded">
          <thead>
            <tr className="bg-gray-800">
              {user.role === "admin" && <th className="p-2">Name</th>}
              {user.role === "admin" && <th className="p-2">Employee ID</th>}
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Check In</th>
              <th className="p-2">Check Out</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r) => (
              <tr key={r._id} className="text-center border-t border-gray-700">
                
                {/* Admin Fields */}
                {user.role === "admin" && (
                  <td className="p-2">{r.userId?.name}</td>
                )}

                {user.role === "admin" && (
                  <td className="p-2">{r.userId?.employeeId}</td>
                )}

                <td className="p-2">{r.date}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2">
                  {r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : "-"}
                </td>
                <td className="p-2">
                  {r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;