import { useEffect, useState } from "react";
import API from "../utils/axios";

function ManagerLeaves() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    const res = await API.get("/leave/all");
    setLeaves(res.data);
  };

  const decide = async (id, decision) => {
    try {
      await API.put(`/leave/manager/${id}`, { decision });
      fetchLeaves();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl mb-4">Manager Panel</h1>

      {leaves.map((leave) => (
        <div key={leave._id} className="bg-gray-900 p-4 mb-3 rounded">

          <p><b>Name:</b> {leave.userId?.name}</p>
          <p><b>Type:</b> {leave.type}</p>
          <p><b>Status:</b> {leave.status}</p>

          <p>
            <b>Approvals:</b> {leave.approvals.length}
          </p>

          {leave.status === "Pending" && (
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => decide(leave._id, "Approved")}
                className="bg-green-500 px-3 py-1"
              >
                Approve
              </button>

              <button
                onClick={() => decide(leave._id, "Rejected")}
                className="bg-red-500 px-3 py-1"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ManagerLeaves;