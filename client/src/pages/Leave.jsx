import { useEffect, useState } from "react";
import API from "../utils/axios";

function Leave() {
  const [form, setForm] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [leaves, setLeaves] = useState([]);

  // ✅ Fetch leaves
  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leave/my");
      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Apply leave
  const applyLeave = async () => {
    try {
      await API.post("/leave", form);
      alert("Leave Applied");
      fetchLeaves(); // 🔥 refresh list
    } catch (err) {
      alert("Error applying leave");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl mb-4">Apply Leave</h1>

      {/* Form */}
      <input placeholder="Type" className="input"
        onChange={(e) => setForm({ ...form, type: e.target.value })} />

      <input type="date" className="input"
        onChange={(e) => setForm({ ...form, fromDate: e.target.value })} />

      <input type="date" className="input"
        onChange={(e) => setForm({ ...form, toDate: e.target.value })} />

      <input placeholder="Reason" className="input"
        onChange={(e) => setForm({ ...form, reason: e.target.value })} />

      <button onClick={applyLeave} className="bg-white text-black px-4 py-2 mb-6">
        Apply
      </button>

      {/* 🔥 Leave List */}
      <h2 className="text-xl mb-3">My Leaves</h2>

      {leaves.length === 0 ? (
        <p>No leaves found</p>
      ) : (
        leaves.map((leave) => (
          <div key={leave._id} className="bg-gray-900 p-3 mb-2 rounded">
            <p>Type: {leave.type}</p>
            <p>From: {leave.fromDate}</p>
            <p>To: {leave.toDate}</p>
            <p>Status: {leave.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Leave;