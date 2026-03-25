import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useAuth } from "../context/AuthContext";

function Leave() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const url =
        user.role === "admin" ? "/leave/all" : "/leave/my";

      const res = await API.get(url);
      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const applyLeave = async () => {
    try {
      await API.post("/leave", form);
      alert("Leave Applied");
      fetchLeaves();
    } catch (err) {
      alert("Error");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leave/${id}`, { status });
      fetchLeaves();
    } catch (err) {
      alert("Error updating");
    }
  };

  useEffect(() => {
    if (user) fetchLeaves();
  }, [user]);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl mb-4">Leave Management</h1>

      {/* 🔥 SHOW FORM ONLY FOR EMPLOYEE */}
      {user.role !== "admin" && (
        <>
          <h2 className="text-xl mb-2">Apply Leave</h2>

          <input placeholder="Type" className="input"
            onChange={(e) => setForm({ ...form, type: e.target.value })} />

          <input type="date" className="input"
            onChange={(e) => setForm({ ...form, fromDate: e.target.value })} />

          <input type="date" className="input"
            onChange={(e) => setForm({ ...form, toDate: e.target.value })} />

          <input placeholder="Reason" className="input"
            onChange={(e) => setForm({ ...form, reason: e.target.value })} />

          <button
            onClick={applyLeave}
            className="bg-white text-black px-4 py-2 mb-6"
          >
            Apply
          </button>
        </>
      )}

      {/* 🔥 LEAVE LIST */}
      <h2 className="text-xl mb-3">
        {user.role === "admin" ? "All Leave Requests" : "My Leaves"}
      </h2>

      {leaves.length === 0 ? (
        <p>No leaves found</p>
      ) : (
        leaves.map((leave) => (
          <div key={leave._id} className="bg-gray-900 p-4 mb-3 rounded">

            {/* Admin view */}
            {user.role === "admin" && (
              <>
                <p><b>Name:</b> {leave.userId?.name}</p>
                <p><b>Email:</b> {leave.userId?.email}</p>
              </>
            )}

            <p><b>Type:</b> {leave.type}</p>
            <p><b>From:</b> {leave.fromDate}</p>
            <p><b>To:</b> {leave.toDate}</p>
            <p><b>Status:</b> {leave.status}</p>

            {/* 🔥 ADMIN ACTION BUTTONS */}
            {user.role === "admin" && leave.status === "Pending" && (
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => updateStatus(leave._id, "Approved")}
                  className="bg-green-500 px-3 py-1"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(leave._id, "Rejected")}
                  className="bg-red-500 px-3 py-1"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Leave;