import kidsregister from '../assets/Parents/kidsregister.webp';
import kidzkornerbutton from '../assets/Parents/kidzkornerbutton.webp';
import dashboardparentz from '../assets/Parents/dashboardparentz.webp';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import bg from "../assets/Parents/bgparentskorner.webp";
import Logout from "../components/Logout";
import api from '../api';
import kidzmanagement from "../assets/Parents/kidzmanagement.webp"
import timelimit from "../assets/Parents/timelimit.webp"

import logoutImg from "../assets/logout.webp"
function ParentsKorner() {
  const [clicked, setClicked] = useState(false);
  const [checkUser, setCheckUser] = useState(null);
  const [parentData, setParentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState();
  const [activeAction, setActiveAction] = useState(null);
  const [logout, setLogout]= useState();
  const [clickedLogout, setClickedLogout] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParentData = async () => {
        
        const token = localStorage.getItem("access");
        if (!token) {
        setLoading(false);
        return;
        }

      try {
        const res = await api.get("/api/parent/");
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setParentData(data);
      } catch (err) {
        console.error("Error fetching parent data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchParentData();
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await api.get("/api/user-profile/");
        setCheckUser(res.data.first_name);
      } catch (err) {
        console.error("Error fetching user name:", err);
      }
    };
    fetchUserName();
  }, []);

  const handleChildClick = (child) => {
    localStorage.setItem("selectedChild", JSON.stringify(child));

    if (activeAction === "KidzKorner") {
      navigate("/home", { state: { child } });
    } else if (activeAction === "Dashboard") {
      navigate("/dashboardparentz", { state: { child } });
    }

    setClicked(false);
  };

  const openModal = (action) => {
    setActiveAction(action);
    setClicked(true);
  };

  const logoutClick = (logout) => {
      setClickedLogout(true)
      setLogout(logout)

  }

  const handleExit = () => {
    setClicked(false);
    setActiveAction(null);
    setClickedLogout(false)
  };

  const handleHover = (id) => {
    setHoveredItem(id);
  };

  


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-[#3DA8CC] font-[coiny]">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div
        className="hidden justify-center md:flex md:absolute h-screen  w-screen bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      >
          <Link to="/parentalGuidance">
  <div className="w-auto absolute z-50 left-[80%] top-[5%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000">
    <img
      src={timelimit}
      alt="Parental Guidance"
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
</Link>


         <div className='text-4xl h-[5%] w-[5%] hover:text-amber-500 hover:cursor-pointer absolute left-[1%] top-[1%]' onClick={() => logoutClick("logout")}> <img src={logoutImg} alt="logout button" /></div>
       
        <div className="text-4xl h-fit w-fit absolute top-[12%]">
          Welcome {checkUser}!

        </div>

        <Link to="/childRegistration">
          <div
            onMouseEnter={() => handleHover("Register your children")}
            onMouseLeave={() => setHoveredItem()}
            className="absolute flex left-[42%] justify-center items-center top-[34%] h-auto w-auto cursor-pointer"
          >
            <img src={kidsregister} alt="Registration Button for Parents" />
            {hoveredItem === "Register your children" && (
              <div className="absolute bg-black text-white p-2 rounded mt-2">
                {hoveredItem}
              </div>
            )}
          </div>
        </Link>

        <Link to="/managechildren">
          <div
            onMouseEnter={() => handleHover("Manage children profiles")}
            onMouseLeave={() => setHoveredItem()}
            className="absolute flex left-[59%] justify-center items-center top-[34%] h-auto w-auto cursor-pointer"
          >
            <Link to="/manageChildren">
  <div className="flex w-auto justify-center hover:opacity-85 motion-preset-pulse-sm motion-duration-2000">
    <img
      src={kidzmanagement}
      alt="Manage Children"
      className="w-58 object-contain"
    />
  </div>
</Link>

            {hoveredItem === "Manage children profiles" && (
              <div className="absolute bg-black text-white p-2 rounded mt-2">
                {hoveredItem}
              </div>
            )}
          </div>
        </Link>

        <div
          onMouseEnter={() => handleHover("Check children progress")}
          onMouseLeave={() => setHoveredItem()}
          onClick={() => openModal("Dashboard")}
          className="absolute left-[77%] flex justify-center items-center top-[34%] h-auto w-auto cursor-pointer"
        >
          <img src={dashboardparentz} alt="Dashboard for Parents" />
          {hoveredItem === "Check children progress" && (
            <div className="absolute bg-black text-white p-2 rounded mt-2">
              {hoveredItem}
            </div>
          )}
        </div>

        <div
          onMouseEnter={() => handleHover("Play games")}
          onMouseLeave={() => setHoveredItem()}
          onClick={() => openModal("KidzKorner")}
          className="absolute flex justify-center items-center left-[10%] top-[34%] h-auto w-auto cursor-pointer"
        >
          <img src={kidzkornerbutton} alt="Entire Games for Kidz" />
          {hoveredItem === "Play games" && (
            <div className="absolute bg-black text-white p-2 rounded mt-2">
              {hoveredItem}
            </div>
          )}
        </div>

        {clicked && (
          <>
            <div className="h-full w-full bg-black opacity-45 absolute"></div>
            <div className="h-full w-full absolute z-10 flex justify-center items-center">
              <div className="h-100 w-200 bg-amber-400 z-10 absolute flex items-center justify-center">
                <div className="absolute top-3 flex text-4xl">
                  <h1>
                    {activeAction === "Dashboard"
                      ? "Select a child to view progress"
                      : "Who will play?"}
                  </h1>
                </div>
                
                <button
                  className="h-10 w-10 bg-red-500 text-white absolute font-bold text-3xl top-4 right-8 z-10 rounded-full hover:bg-red-600 flex items-center justify-center"
                  onClick={handleExit}
                >
                  x
                </button>

                {parentData.children && parentData.children.length > 0 ? (
                  <div className="h-[70%] w-[100%] text-center content-center text-5xl bg-blue-300">
                    {parentData.children.map((child) => (
                      <div
                        key={child.id}
                        onClick={() => handleChildClick(child)}
                        className="bg-amber-50 first:mb-5 last:mt-5 cursor-pointer hover:bg-amber-200 transition"
                      >
                        {child.child_full_name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No children registered.</p>
                )}
              </div>
            </div>
          </>  
        )}
       


        {clickedLogout && logout === "logout" && <>
        <div className='transition transform absolute flex justify-center items-center h-[100vh] w-[100vw]  z-100'>

        <div className=' h-[100%] w-[100%] bg-gray-800 opacity-50'>       
        </div>
         <div className='flex justify-center items-center absolute h-[40%] w-[40%] bg-blue-200 rounded-2xl'>
          <div>
             <h1 className='text-2xl'>Are you sure you want to <span className='font-bold'>LOGOUT?</span></h1> 
            <div className='flex gap-20 justify-center'><Logout/> <h1 className='text-2xl bg-green-500 hover:bg-green-400 transition transform hover:scale-110 rounded-lg hover:cursor-pointer' onClick={handleExit}>Cancel</h1></div>
         </div>

       

         {clicked }
               
         </div>
   
        </div>
      
        </>}


     

      </div>
    </>
  );
}

export default ParentsKorner;
