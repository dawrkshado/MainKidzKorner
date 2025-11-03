import { useState, useEffect } from 'react';
import Back from '../components/Back';
import api from '../api';
import ManageBg from "../assets/Admin/ManageAcc.webp";

function ManageChildren() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searchParameters] = useState(['child_full_name', 'section', 'class_sched']);
  const [editingChild, setEditingChild] = useState(null);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    class_sched: ''
  });

  // Fetch children
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await api.get("/api/parent-children/");
        setChildren(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching children:", err);
        alert(err.response?.data?.error || "Failed to fetch children.");
        setLoading(false);
      }
    };
    fetchChildren();
  }, []);

  // Search functionality
  const searchResults = children.filter((child) => {
    return searchParameters.some((key) => {
      return (
        child[key] &&
        child[key].toString().toLowerCase().includes(query.toLowerCase())
      );
    });
  });

  // Handle edit button click
  const handleEditClick = (child) => {
    setEditingChild(child.id);
    // Parse birth_date from format "DD Month, YYYY" back to "YYYY-MM-DD"
    let birthDateFormatted = '';
    if (child.birth_date) {
      const date = new Date(child.birth_date);
      if (!isNaN(date.getTime())) {
        birthDateFormatted = date.toISOString().split('T')[0];
      }
    }
    
    setEditForm({
      first_name: child.child_full_name?.split(' ')[0] || '',
      last_name: child.child_full_name?.split(' ').slice(1).join(' ') || '',
      birth_date: birthDateFormatted,
      class_sched: child.class_sched || ''
    });
  };

  // Calculate age from birthdate
  const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  // Handle save edit
  const handleSaveEdit = async (childId) => {
    // Validate age before saving
    if (editForm.birth_date) {
      const age = calculateAge(editForm.birth_date);
      if (age !== 5) {
        alert(`Child must be 5 years old. Current age based on birthdate: ${age} years old.`);
        return;
      }
    }
    
    try {
      const res = await api.put(`/api/children/${childId}/`, editForm);
      
      // Update the child in the list
      setChildren(children.map(child => 
        child.id === childId ? res.data : child
      ));
      
      setEditingChild(null);
      setEditForm({
        first_name: '',
        last_name: '',
        birth_date: '',
        class_sched: ''
      });
      
      alert("Child profile updated successfully!");
    } catch (err) {
      console.error("Error updating child:", err);
      alert(err.response?.data?.error || "Failed to update child profile.");
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingChild(null);
    setEditForm({
      first_name: '',
      last_name: '',
      birth_date: '',
      class_sched: ''
    });
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
              placeholder="Search children..."
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
                  <th className="border-2 bg-amber-400 p-2 min-w-[150px]">Child Name</th>
                  <th className="border-2 bg-amber-400 p-2 min-w-[180px]">Section</th>
                  <th className="border-2 bg-amber-400 p-2 min-w-[200px]">Class Schedule</th>
                  <th className="border-2 bg-amber-400 p-2 min-w-[150px]">Birth Date</th>
                  <th className="border-2 bg-amber-400 p-2 min-w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((child) => (
                  <tr key={child.id} className="text-2xl">
                    {editingChild === child.id ? (
                      <>
                        <td className="border-2 p-2 break-words">
                          <div className="flex gap-1">
                            <input
                              type="text"
                              value={editForm.first_name}
                              onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                              className="w-full px-1 py-1 text-center border rounded"
                              placeholder="First Name"
                            />
                            <input
                              type="text"
                              value={editForm.last_name}
                              onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                              className="w-full px-1 py-1 text-center border rounded"
                              placeholder="Last Name"
                            />
                          </div>
                        </td>
                        <td className="border-2 p-2 break-words">{child.section}</td>
                        <td className="border-2 p-2 break-words">
                          <select
                            value={editForm.class_sched}
                            onChange={(e) => setEditForm({ ...editForm, class_sched: e.target.value })}
                            className="w-full px-1 py-1 text-center border rounded"
                          >
                            <option value="">-- Select Schedule --</option>
                            <option value="8:00 AM to 11:00 AM">Morning: 8:00 AM to 11:00 AM</option>
                            <option value="11:00 AM to 1:00 PM">Noon: 11:00 AM to 1:00 PM</option>
                          </select>
                        </td>
                        <td className="border-2 p-2 break-words">
                          <input
                            type="date"
                            value={editForm.birth_date}
                            onChange={(e) => setEditForm({ ...editForm, birth_date: e.target.value })}
                            className="w-full px-1 py-1 text-center border rounded"
                          />
                        </td>
                        <td className="border-2 p-2 break-words">
                          <div className="flex justify-center items-center gap-1">
                            <button
                              onClick={() => handleSaveEdit(child.id)}
                              className="bg-green-600 text-white px-2 py-1 scale-90 rounded-md hover:bg-green-500 transition transform hover:scale-100 whitespace-nowrap"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="bg-gray-600 text-white px-2 py-1 scale-90 rounded-md hover:bg-gray-500 transition transform hover:scale-100 whitespace-nowrap"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border-2 p-2 break-words max-w-[300px]">{child.child_full_name}</td>
                        <td className="border-2 p-2 break-words max-w-[250px]">{child.section || 'N/A'}</td>
                        <td className="border-2 p-2 break-words max-w-[300px]">{child.class_sched || 'N/A'}</td>
                        <td className="border-2 p-2 break-words max-w-[200px]">{child.birth_date || 'N/A'}</td>
                        <td className="border-2 p-2 break-words">
                          <div className="flex justify-center items-center gap-1 flex-wrap">
                            <button
                              onClick={() => handleEditClick(child)}
                              className="bg-blue-600 text-white px-2 py-1 scale-90 rounded-md hover:bg-blue-500 transition transform hover:scale-100 whitespace-nowrap"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                {searchResults.length === 0 && (
                  <tr>
                    <td colSpan="5" className="border-2 p-4 text-xl">
                      No children found.
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

export default ManageChildren;

