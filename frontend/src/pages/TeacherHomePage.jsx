

import dashboard from "../assets/TeacherHomePage/una.png";
import studentmanagement from "../assets/TeacherHomePage/pangalawa.png";
import overview from "../assets/TeacherHomePage/panglima.png";
import usercontrol from "../assets/TeacherHomePage/pangapat.png";
import UploadContents from "../assets/TeacherHomePage/pangatlo.png";
import { Link } from 'react-router-dom'
import Logout from "../components/Logout";
import { useEffect,useState } from "react";
import api from "../api.js";


function TeacherHomePage() {
const [name, setName] = useState(null);

const [loading, setLoading] = useState(true);
const [clickedLogout, setClickedLogout] = useState(false);
const [logout,setLogout] = useState() 



 useEffect(() => {
    const fetchTeacherData = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/api/user-profile");
        const data =  res.data;
        setName(data.first_name)
      } catch (err) {
        console.error("Error fetching parent data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherData();
  }, []);


const handleClick = (click) => {
  setLogout(click)
  setClickedLogout(true)

}

const handleCancel = () =>{
  setLogout(null)
  setClickedLogout(false)
}

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-[#3DA8CC] font-[coiny]">
        Loading...
      </div>
    );
  }


  return (
       
    <div className="hidden md:inline md:absolute h-screen w-screen overflow-x-hidden ">
      <div className="hidden md:inline md:absolute h-screen w-screen overflow-x-hidden ">
        <img src="./Bg/mainteacherbg.webp" alt="background" className="w-full"/>
              <div className="text-white text-4xl w-fit absolute top-18 left-100">Teacher {name}</div>
   
        <Link to="/dashboard">
        <img src={dashboard} 
        alt="blue box Button for dashboard page" 
        className="absolute left-[25%] top-[50%] " /></Link>

        <Link to="/studentmanagement">
        <img src={studentmanagement} 
        alt="blue box Button for studentmanagement page" 
        className="absolute left-[25%] top-[30%] "/></Link>
        
        <Link to="/overview">
        <img src={overview} 
        alt="blue box Button for overviewy page" 
        className="absolute right-[21%] top-[51%] "/></Link>

        <Link to="/usercontrol">
        <img src={usercontrol} 
        alt="blue box Button for user control page" 
        className="absolute right-[21%] top-[31%] "/></Link>

        <Link to="/uploadcontents">
        <img src={UploadContents}
        alt="blue box Button for upload"
        className="absolute left-[40%] top-[70%]"/></Link>

            <div className="h-fit w-fit absolute text-3xl top-0 bg-amber-300 hover:cursor-pointer hover:opacity-80" onClick={() =>handleClick("logout")}> Logout</div>
        </div>


        {clickedLogout && logout === "logout" && <>
        <div className='absolute flex justify-center items-center h-[100vh] w-[100vw] '>

        <div className=' h-[100%] w-[100%] bg-gray-800 opacity-50'>       
        </div>
         <div className='flex justify-center items-center absolute h-[40%] w-[40%] bg-blue-200 rounded-2xl'>
          <div>
             <h1 className='text-2xl'>Are you sure you want to <span className='font-bold'>LOGOUT?</span></h1>
            <div className='flex gap-20 justify-center'><Logout/> <h1 className='text-2xl bg-green-500 rounded-lg hover:cursor-pointer' onClick={handleCancel}>Cancel</h1></div>
         </div> 
               
         </div>
   
        </div>
      
        </>}

   

    </div>
    
    
  );
}

export default TeacherHomePage;
