import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../components/Form.css";
import LoadingIndicator from "./LoadingIndicator.jsx";


function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error,setError] = useState()



  const handleSubmit = async (e) => {

       setLoading(true);
        e.preventDefault();
        setError(null)
    try {
      const res = await api.post("/api/login/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);


      const userRes = await api.get("/api/user-profile/");
      const role = userRes.data.role;
      localStorage.setItem("userRole", role);


      window.dispatchEvent(new Event("storage"));


      if (role === "Teacher") {
        navigate("/teacher");
      }else if (role === "Parent") {
        navigate("/parentskorner");
      }else if(role === "Admin"){
        navigate("/admin")
      }else {
            navigate("/login")
      }
    } catch (err) {
        console.error("Login failed:", err);
        alert("Invalid username/email or password.");
    }
     finally {
            setLoading(false)
        }
    
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Login</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username or Email"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit">
        Login
      </button>
    </form>
  );
}

export default Form;
