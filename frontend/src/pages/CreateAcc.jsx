import { useState, useEffect } from "react";
import CreateUserBG from "../assets/Admin/CreateUSER.webp";
import api from "../api";

function CreateAcc() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); 
  const [roles, setRoles] = useState([]); // fetched roles
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/api/roles/");
        setRoles(res.data);
        if (res.data.length > 0) setRole(res.data[0]); // set default to first role (it's a string)
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/register/", {
        username,
        password,
        confirm_password: confirmPassword,
        email,
        first_name: firstName,
        last_name: lastName,
        role,
      });

      setMessage(response.data.message);
      alert("Account created successfully!");
      handleClear();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-[100vh] w-[100wh] bg-cover"
      style={{ backgroundImage: `url(${CreateUserBG})` }}
    >
      <div className="bg-amber-300 p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4 w-[400px]">
        <h2 className="text-xl font-bold">Create New User</h2>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="m-3">
            <label className="block mb-1">First Name:</label>
            <input
              required
              value={firstName}
              onChange={(e) => {
                const value = e.target.value;
                const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                setFirstName(capitalized);
              }}
              className="w-full p-2 rounded-md border capitalize"
            />
          </div>

          <div className="m-3">
            <label className="block mb-1">Last Name:</label>
            <input
              required
              type="text"
              value={lastName}
              onChange={(e) => {
                const value = e.target.value;
                const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                setLastName(capitalized);
              }}
              className="w-full p-2 rounded-md border capitalize"
            />
          </div>

          <div className="m-3">
            <label className="block mb-1">Username</label>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded-md border"
            />
          </div>

          <div className="m-3">
            <label className="block mb-1">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md border"
            />
          </div>

          <div className="m-3">
            <label className="block mb-1">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-md border"
            />
          </div>

          <div className="m-3">
            <label className="block mb-1">Confirm Password</label>
            <input
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded-md border"
            />
          </div>

          <div className="m-3">
            <label className="block mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 rounded-md border"
            >
              {roles.length > 0 ? (
                roles.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))
              ) : (
                <option>Loading roles...</option>
              )}
            </select>
          </div>

          <div className="flex gap-4 justify-center mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Register
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Clear
            </button>
          </div>
        </form>

        {message && <p className="text-red-600 text-center mt-2">{message}</p>}
      </div>
    </div>
  );
}

export default CreateAcc;
