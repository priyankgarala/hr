import { useEffect, useState } from "react";
import API from "../utils/axios";

function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leave/all");
      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leave/${id}`, { status });
      fetchLeaves(); // refresh
    } catch (err) {
      alert("Error updating");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl mb-4">Admin - Leave Requests</h1>

      {leaves.length === 0 ? (
        <p>No leave requests</p>
      ) : (
        leaves.map((leave) => (
          <div key={leave._id} className="bg-gray-900 p-4 mb-3 rounded">
            
            <p><b>Name:</b> {leave.userId?.name}</p>
            <p><b>Email:</b> {leave.userId?.email}</p>
            <p><b>Type:</b> {leave.type}</p>
            <p><b>From:</b> {leave.fromDate}</p>
            <p><b>To:</b> {leave.toDate}</p>
            <p><b>Status:</b> {leave.status}</p>

            {/* Buttons */}
            {leave.status === "Pending" && (
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

export default AdminLeaves;