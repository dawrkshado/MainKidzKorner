import { useState, useEffect } from 'react';
import Back from '../components/Back';
import api from '../api';
import ManageBg from "../assets/Admin/ManageAcc.webp";

function ManageAcc() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searchParameters] = useState(['username', 'first_name', 'last_name', 'email', 'role_name']);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: '',
    password: ''
  });
  const [roles, setRoles] = useState([]);

  // Fetch roles for dropdown
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/api/roles/");
        setRoles(res.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/users/");
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        alert(err.response?.data?.error || "Failed to fetch users.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Search functionality
  const searchResults = users.filter((user) => {
    return searchParameters.some((key) => {
      return (
        user[key] &&
        user[key].toString().toLowerCase().includes(query.toLowerCase())
      );
    });
  });

  // Handle edit button click
  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setEditForm({
      username: user.username || '',
      email: user.email || '',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      role: user.role_name || '',
      password: '' // Don't pre-fill password
    });
  };

  // Handle save edit
  const handleSaveEdit = async (userId) => {
    try {
      const updateData = { ...editForm };
      // Remove password from update if empty
      if (!updateData.password) {
        delete updateData.password;
      }
      
      const res = await api.put(`/api/users/${userId}/`, updateData);
      
      // Update the user in the list
      setUsers(users.map(user => 
        user.id === userId ? res.data : user
      ));
      
      setEditingUser(null);
      setEditForm({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        role: '',
        password: ''
      });
      
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert(err.response?.data?.error || "Failed to update user.");
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      role: '',
      password: ''
    });
  };

  // Handle delete
  const handleDeleteUser = async (userId, username) => {
    try {
      // Fetch deletion info to show warning
      const infoRes = await api.get(`/api/users/${userId}/delete-info/`);
      const deletionInfo = infoRes.data;
      
      // Build warning message
      let warningMessage = `⚠️ WARNING: Deleting user "${username}" will PERMANENTLY delete:\n\n`;
      
      if (deletionInfo.children_count > 0) {
        warningMessage += `• ${deletionInfo.children_count} child/children\n`;
        if (deletionInfo.time_completions_count > 0) {
          warningMessage += `  → ${deletionInfo.time_completions_count} game progress records\n`;
        }
      }
      
      if (deletionInfo.uploaded_files_count > 0) {
        warningMessage += `• ${deletionInfo.uploaded_files_count} uploaded file(s)\n`;
      }
      
      if (!deletionInfo.has_related_data) {
        warningMessage += `• No related data found\n`;
      }
      
      warningMessage += `\nThis action CANNOT be undone!\n\nAre you sure you want to proceed?`;
      
      if (!window.confirm(warningMessage)) {
        return;
      }
    } catch (err) {
      // If we can't fetch info, show basic warning
      if (!window.confirm(`Are you sure you want to delete user "${username}"? This will delete all their children, progress, and uploaded files. This action cannot be undone.`)) {
        return;
      }
    }

    try {
      await api.delete(`/api/users/${userId}/delete/`);
      setUsers(users.filter(user => user.id !== userId));
      alert(`User "${username}" deleted successfully!`);
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.response?.data?.error || "Failed to delete user.");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <Back />
      <div
        className="flex justify-center items-center md:absolute h-screen w-screen overflow-x-hidden bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${ManageBg})` }}
      >
        <form action="">
          <div className="absolute top-[3%] flex right-[10%] gap-2 h-10">
            <input
              className="bg-amber-300 text-center w-60 rounded-lg"
              type="search"
              value={query}
              id="search-form"
              placeholder="Search users..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>

        {loading ? (
          <div className="flex items-center justify-center h-screen text-xl text-[#3DA8CC]">
            Loading...
          </div>
        ) : (
          <div className="h-[100%] w-[80%] z-50 max-h-[80%] overflow-auto">
            <table className="w-full border-collapse bg-amber-200 text-center" style={{ tableLayout: 'auto', minWidth: '100%' }}>
              <thead>
                <tr className="font-bold border-2 text-2xl">
                  <th className="border-2 bg-amber-400 p-2 min-w-[120px]">Username</th>
                  <th className="border-2 bg-amber-400 p-2 min-w-[120px]">First Name</th>
                  <th className="border-2 bg-amber-400 p-2 min-w-[120px]">Last Name</th>
                  <th className="border-2 bg-amber-400 p-2 min-w-[180px]">Email</th>
                  <th className="border-2 bg-amber-400 p-2 min-w-[100px]">Role</th>
                  <th className="border-2 bg-amber-400 p-2 min-w-[130px]">Date Joined</th>
                  <th className="border-2 bg-amber-400 p-2 min-w-[150px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((user) => (
                  <tr key={user.id} className="text-2xl">
                    {editingUser === user.id ? (
                      <>
                        <td className="border-2 p-2 break-words">
                          <input
                            type="text"
                            value={editForm.username}
                            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                            className="w-full px-1 py-1 text-center border rounded"
                          />
                        </td>
                        <td className="border-2 p-2 break-words">
                          <input
                            type="text"
                            value={editForm.first_name}
                            onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                            className="w-full px-1 py-1 text-center border rounded"
                          />
                        </td>
                        <td className="border-2 p-2 break-words">
                          <input
                            type="text"
                            value={editForm.last_name}
                            onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                            className="w-full px-1 py-1 text-center border rounded"
                          />
                        </td>
                        <td className="border-2 p-2 break-words">
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="w-full px-1 py-1 text-center border rounded"
                          />
                        </td>
                        <td className="border-2 p-2 break-words">
                          <select
                            value={editForm.role}
                            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                            className="w-full px-1 py-1 text-center border rounded"
                          >
                            {roles.map((role, index) => (
                              <option key={index} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="border-2 p-2 break-words">{formatDate(user.date_joined)}</td>
                        <td className="border-2 p-2 break-words">
                          <div className="flex flex-col justify-center items-center gap-1">
                            <input
                              type="password"
                              value={editForm.password}
                              onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                              className="w-full px-1 py-1 text-center border rounded mb-1"
                              placeholder="New password (optional)"
                            />
                            <div className="flex justify-center items-center gap-1">
                              <button
                                onClick={() => handleSaveEdit(user.id)}
                                className="bg-green-600 text-white px-2 py-1 scale-90 rounded-md hover:bg-green-500 transition transform hover:scale-100"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="bg-gray-600 text-white px-2 py-1 scale-90 rounded-md hover:bg-gray-500 transition transform hover:scale-100"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border-2 p-2 break-words max-w-[200px]">{user.username}</td>
                        <td className="border-2 p-2 break-words max-w-[200px]">{user.first_name || 'N/A'}</td>
                        <td className="border-2 p-2 break-words max-w-[200px]">{user.last_name || 'N/A'}</td>
                        <td className="border-2 p-2 break-words max-w-[250px]">{user.email || 'N/A'}</td>
                        <td className="border-2 p-2 break-words max-w-[150px]">{user.role_name || 'N/A'}</td>
                        <td className="border-2 p-2 break-words max-w-[180px]">{formatDate(user.date_joined)}</td>
                        <td className="border-2 p-2 break-words">
                          <div className="flex justify-center items-center gap-1 flex-wrap">
                            <button
                              onClick={() => handleEditClick(user)}
                              className="bg-blue-600 text-white px-2 py-1 scale-90 rounded-md hover:bg-blue-500 transition transform hover:scale-100 whitespace-nowrap"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id, user.username)}
                              className="bg-red-600 text-white px-2 py-1 scale-90 rounded-md hover:bg-red-500 transition transform hover:scale-100 whitespace-nowrap"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                {searchResults.length === 0 && (
                  <tr>
                    <td colSpan="7" className="border-2 p-4 text-xl">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
  </div>
</>
  );
}

export default ManageAcc;
