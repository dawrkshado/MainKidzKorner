import adminbg from "../assets/adminbg.png";
import logoutbutton from "../assets/Admin/logoutbuton.webp";
import managebutton from "../assets/Admin/managebutton.webp";
import createbutton from "../assets/Admin/createbutton.webp";
import { Link, useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
  
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  return (
    <div
      className="relative min-h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${adminbg})` }}
    >

      <Link to="/createaccounts">
        <img
          src={createbutton}
          alt="Create Button"
          className="absolute cursor-pointer hover:scale-105 transition-transform"
          style={{
            top: "47%",
            left: "60%",
            width: "auto",
          }}
        />
      </Link>


      <Link to="/manageaccounts">
        <img
          src={managebutton}
          alt="Manage Button"
          className="absolute cursor-pointer hover:scale-105 transition-transform"
          style={{
            top: "30%",
            left: "65%",
            width: "auto",
          }}
        />
      </Link>


      <img
        src={logoutbutton}
        alt="Logout Button"
        onClick={handleLogout}
        className="absolute cursor-pointer hover:scale-105 transition-transform"
        style={{
          top: "80%",
          left: "63%",
          width: "auto",
        }}
      />
    </div>
  );
}

export default Admin;
