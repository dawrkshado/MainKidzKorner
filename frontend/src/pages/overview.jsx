
import { useEffect,useState } from "react"
import api from "../api.js"
import Back from "../components/Back"


function overview() {
const [name, setName] = useState(null);
const [parentData, setParentdata] = useState([]);
const [loading, setLoading] = useState(true);



 useEffect(() => {
    const fetchTeacherData = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/api/parent_profile_teacherview");
        const data =  res.data;
        console.log(data)
        setParentdata(data)
      } catch (err) {
        console.error("Error fetching parent data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherData();
  }, []);

    
  
  return(
        <div className="hidden md:flex md:absolute  w-[100%] h-[100vh] align-middle justify-center overflow-x-hidden ">


              <div> <Back/></div>
            <img src="./Bg/bground.webp" alt="background" className="w-full h-full"/>
            
            <div className="flex absolute  top-0 align-middle justify-center h-[100%] w-fit">
            <img src="./Bg/foreground.webp" alt="foreground" className="h-[100%]" />
            <div className=" absolute top-20 justify-self-center overflow-y-auto max-h-[80%]  h-[80%] w-[100%] ">
              <table className="border-2 absolute h-[100%] w-[100%] text-center ">
                <thead>
                  <tr className="font-bold text-2xl">
                    <td className="border-2 ">Name</td>
                    <td className="border-2">Email</td>
                    <td className="border-2">Children</td>
                  </tr>
                </thead>
                <tbody>
                    {parentData.map((parentDetails, id) => (
                    <tr key={id} className="h-[20%] max-h-[20%]">
                      <td className="border-2">{parentDetails.first_name} {parentDetails.last_name}</td>
                      <td className="border-2">{parentDetails.email}</td>
                      <td className="border-2">
                        {parentDetails.children.length > 0
                          ? parentDetails.children.map((child, i) => (
                              <div key={i}>{child.first_name} {child.last_name}</div>
                            ))
                          : "No children"}
                      </td>
                    </tr>
                    ))}
                </tbody>
              </table>
              </div>

             </div>
        </div>
         )

}
export default overview