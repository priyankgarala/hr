import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/SideBar";

function Profile() {
  const { user, fetchUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      await updateProfile(form);
      await fetchUser();
      setEditMode(false);
      alert("Profile updated");
    } catch (err) {
      alert("Error updating profile");
    }
  };

  if (!user) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar />
    <div className="flex-1 min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl mb-6">Profile</h1>

      <div className="bg-gray-900 p-6 rounded-xl space-y-4">

        {/* PERSONAL DETAILS */}
        <div>
          <h2 className="text-lg mb-2">Personal Details</h2>

          <input
            disabled={!editMode}
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
          />

          <input
            disabled
            value={form.email || ""}
            className="w-sm input"
          />

          <input
            placeholder="Employee ID"
            disabled
            value={form.employeeId || ""}
            className="input"
          />
        </div>

        {/* JOB DETAILS */}
        <div>
          <h2 className="text-lg mb-2">Job Details</h2>

          <input
            disabled
            value={form.role || ""}
            className="input"
          />

          <input
            disabled={!editMode}
            value={form.department || ""}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
            className="input"
          />
        </div>

        {/* SALARY */}
        <div>
          <h2 className="text-lg mb-2">Salary</h2>

          <input
            disabled
            value={form.salary || 0}
            className="input"
          />
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-lg mb-2">Contact</h2>

          <input
            disabled={!editMode}
            placeholder="Phone"
            value={form.phone || ""}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="input"
          />

          <input
            disabled={!editMode}
            placeholder="Address"
            value={form.address || ""}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="input"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-4">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-white text-black px-4 py-2"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-500 px-4 py-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-red-500 px-4 py-2"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;