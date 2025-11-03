import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../assets/Logo1.webp';
import api from '../api.js';

function TopBar() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userResponse = await api.get("/api/user-profile/");
        const userRole = userResponse.data.role;

        localStorage.setItem('userRole', userRole);
        setRole(userRole);
      } catch (err) {
        console.warn("Not logged in:", err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      await api.post("/api/logout", { refresh_token: refreshToken });

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("userRole");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      navigate("/login");
    }
  };

  if (loading) return <div>Loading...</div>;11

  return (
    <div className="font-[coiny]">
      <div className="w-full h-[3.125rem] bg-[#3DA8CC] flex justify-between items-center">
        <div className="ml-[1%]">
          <Link to="/"><img src={Logo} alt="Logo" /></Link>
        </div>

        <div className="invisible lg:visible flex w-[15%] justify-center gap-x-[10%] text-[90%] text-white">
          <Link to="/"><p className="hover:text-amber-300">Home</p></Link>

          <p className="hover:text-amber-300 cursor-pointer" onClick={handleLogout}>Logout</p>

          <Link to="/about" className="hover:text-amber-300"><p>About</p></Link>

          {role === "Teacher" && (
            <Link to="/teacher"><p>Teacher</p></Link>
          )}

          {role === "Parent" && (
            <Link to="/parentskorner"><p>Parents</p></Link>
          )}
        </div>
        <div className="ml-[1%]">
        </div>
      </div>
    </div>
  );
}

export default TopBar;
