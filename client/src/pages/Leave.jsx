import { useState } from "react";
import API from "../utils/axios";

function Leave() {
  const [form, setForm] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const applyLeave = async () => {
    await API.post("/leave", form);
    alert("Leave Applied");
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl mb-4">Apply Leave</h1>

      <input placeholder="Type" className="input"
        onChange={(e) => setForm({ ...form, type: e.target.value })} />

      <input type="date" className="input"
        onChange={(e) => setForm({ ...form, fromDate: e.target.value })} />

      <input type="date" className="input"
        onChange={(e) => setForm({ ...form, toDate: e.target.value })} />

      <input placeholder="Reason" className="input"
        onChange={(e) => setForm({ ...form, reason: e.target.value })} />

      <button onClick={applyLeave} className="bg-white text-black px-4 py-2">
        Apply
      </button>
    </div>
  );
}

export default Leave;