import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/SideBar";

function Attendance() {
  const { user } = useAuth();

  const [records, setRecords] = useState([]);
  const [filters, setFilters] = useState({
    day: "",
    month: "",
    year: "",
  });

  // 🔥 FETCH ATTENDANCE
  const fetchAttendance = async () => {
    try {
      const params = new URLSearchParams();

      if (filters.day) params.append("day", filters.day);
      if (filters.month) params.append("month", filters.month);
      if (filters.year) params.append("year", filters.year);

      const url =
        user.role === "admin"
          ? `/attendance/all?${params.toString()}`
          : `/attendance?${params.toString()}`;

      const res = await API.get(url);
      setRecords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // CHECK-IN
  const checkIn = async () => {
    await API.post("/attendance/check-in");
    fetchAttendance();
  };

  // CHECK-OUT
  const checkOut = async () => {
    await API.post("/attendance/check-out");
    fetchAttendance();
  };

  // INITIAL LOAD
  useEffect(() => {
    if (user) fetchAttendance();
  }, [user]);

  return (
    <div className="flex">
      <Sidebar />
    <div className="p-6 bg-black text-white min-h-screen w-full flex-1">
      
      <h1 className="text-2xl mb-4">Attendance</h1>

      {/* 🔥 FILTERS */}
      <div className="flex gap-3 mb-4 flex-wrap items-end">

        <div>
          <p className="text-sm">Day</p>
          <input
            type="number"
            value={filters.day}
            placeholder="DD"
            className="input w-20"
            onChange={(e) =>
              setFilters({ ...filters, day: e.target.value })
            }
          />
        </div>

        <div>
          <p className="text-sm">Month</p>
          <input
            type="number"
            value={filters.month}
            placeholder="MM"
            className="input w-20"
            onChange={(e) =>
              setFilters({ ...filters, month: e.target.value })
            }
          />
        </div>

        <div>
          <p className="text-sm">Year</p>
          <input
            type="number"
            value={filters.year}
            placeholder="YYYY"
            className="input w-28"
            onChange={(e) =>
              setFilters({ ...filters, year: e.target.value })
            }
          />
        </div>

        <button
          onClick={fetchAttendance}
          className="bg-white text-black px-4 py-2"
        >
          Apply
        </button>

        <button
          onClick={() => {
            const cleared = { day: "", month: "", year: "" };
            setFilters(cleared);

            setTimeout(() => {
              fetchAttendance();
            }, 0);
          }}
          className="bg-gray-700 px-4 py-2"
        >
          Reset
        </button>

      </div>

      {/* CHECK-IN / CHECK-OUT */}
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

      {/* TABLE */}
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

                {user.role === "admin" && (
                  <td className="p-2">{r.userId?.name}</td>
                )}

                {user.role === "admin" && (
                  <td className="p-2">{r.userId?.employeeId}</td>
                )}

                <td className="p-2">{r.date}</td>
                <td className="p-2">{r.status}</td>

                <td className="p-2">
                  {r.checkIn
                    ? new Date(r.checkIn).toLocaleTimeString()
                    : "-"}
                </td>

                <td className="p-2">
                  {r.checkOut
                    ? new Date(r.checkOut).toLocaleTimeString()
                    : "-"}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Attendance;