import Back from '../components/Back';
import sound from "../assets/Animals/sound.webp";
import move from "../assets/Animals/move.webp";
import baby from "../assets/Animals/baby.webp";
import live from "../assets/Animals/live.webp";
import pet from "../assets/Animals/pet.webp"
import { useState, useEffect } from 'react';
import popUp from "../assets/Parents/showsUp.webp";
import api from '../api';
import { useLocation } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import LoadingIndicator from '../components/LoadingIndicator';


function ParentsDashboard() {
  const [parentData, setParentData] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const child = location.state?.child || JSON.parse(localStorage.getItem("selectedChild"));
  const passedCompletions = location.state?.timeCompletions || JSON.parse(localStorage.getItem("timeCompletions"));
  const [category,setCategory] = useState();

  const [childRecord,setChildRecord] = useState([]);
  
  const [timeCompletions, setTimeCompletions] = useState([]);



useEffect(() => {
  const loadCompletions = async () => {

    if (passedCompletions && passedCompletions.length > 0) {
      setTimeCompletions(passedCompletions);
      return;
    }

    try {
      const res = await api.get("/api/time_completions/");
      setTimeCompletions(res.data);
      console.log(res.data)
    } catch (err) {
      console.error("Error fetching completions:", err);
    }
  };

  loadCompletions();
}, []);

  
  useEffect(() => {
    const fetchParentData = async () => {

      const token = localStorage.getItem(ACCESS_TOKEN)
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/api/parent/");
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setParentData(data);
        console.log("child:", child); 
        console.log("passedCompletions:", passedCompletions);

      } catch (err) {
        console.error("Error fetching parent data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchParentData();
  }, []);



useEffect(() => {
  if (timeCompletions.length > 0 && child) {
    const filteredRecords = timeCompletions.filter(
      (record) => record.child.id === child.id
    );
    setChildRecord(filteredRecords);
  }
}, [timeCompletions, child]);



  const handleClick = (id) => {
    setCategory(id)
    setClicked(true)
  };
    

  const handleClose = () => setClicked(false);



  return (

    <>
      
           

       
      <div
        className="hidden md:flex md:absolute items-center justify-center h-screen w-screen bg-cover bg-no-repeat"
        style={{ backgroundImage: `url("./Bg/parentsoverviewbg.png")` }}
      > <Back/>
     
        {/* Buttons */}
        <div className="h-[100vh] w-fit flex items-center justify-center">
          <div className='text-center'>
            <label className='text-2xl'> Animal Sounds</label>
          <img src={sound} onClick={()=> handleClick ("Animal Sounds")} alt="Animal Sounds" className="cursor-pointer transition transform hover:scale-110" />
          </div>
          
          <div className='text-center'>
            <label className='text-2xl'> Animal Movements</label>
            <img src={move} onClick={()=> handleClick ("Animal Movements")} alt="Animal Movements" className="cursor-pointer transition transform hover:scale-110" />
          </div>
          
          <div className='text-center'>
            <label className='text-2xl'>Baby Animals</label>
              <img src={baby} onClick={()=> handleClick ("Baby Animals")} alt="Baby Animals" className="cursor-pointer transition transform hover:scale-110" />
          </div>
          
          <div className='text-center'>
            <label className='text-2xl'>Animal Habitat</label>
            <img src={live} onClick={()=> handleClick ("Animal Habitat")} alt="Animal Habitat" className="cursor-pointer transition transform hover:scale-110" />

          </div>
          
          <div className='text-center'>
            <label className='text-2xl'>Pet or Wild</label>
               <img src={pet} onClick={()=> handleClick ("Pet or Wild")} alt="Pet or Wild" className="cursor-pointer transition transform hover:scale-110" />
          </div>
         

        </div>

        {/* Pop-up */}
          {clicked  && category === "Animal Sounds" && <><div className='flex justify-center items-center z-1000 h-[100vh] w-[100vw] absolute'>
          <div className=' bg-black absolute h-[100%] w-[100%] opacity-50 '></div>
          <div className="flex justify-center items-center h-fit w-fit absolute">
            <img src={popUp} alt="Pop up background" className="w-[85%]" />
                 <p className='absolute z-10 top-10 text-6xl'>
                  {category}
                </p>
                <div className="absolute h-[100%] w-[100%] content-end  justify-items-center mt-4 text-lg text-black p-4 rounded">
                  {childRecord.length  > 0 ? <>
                       <div className=' absolute top-[20%] overflow-y-auto bg-amber-200 max-h-[60%] h-[60%] w-[80%] text-center '>
                    <table className='h-[100%] w-[100%] '>
                      <thead className='border-4'>
                      <tr>
                        <th className='border-r-4'>Lesson/Activity</th>
                        <th className='border-r-4'>Time</th>
                        <th className='border-r-4'>Star</th>
                      </tr>
                      </thead>
                   
                      <tbody className='border-4'>
                        {childRecord.filter(record => record.game_level.game_name === "Lesson1 Activity2" || record.game_level.game_name === "Lesson1 Activity1")
                              .map((record, id) => (
                              <tr key={id}>
                      
                              <td className='border-r-4'>{record.game_level.game_name}</td>
                              <td className='border-r-4'>{record.time}</td>
                              <td className='border-r-4'>{record.star} ⭐</td>
                              </tr>
                        ))}
                      </tbody>
                    </table>
                     </div>
                  
                   <div className="text-5xl bottom-0 absolute">
                    {child.child_full_name}
                  </div>
                 </> : (
                    <p className="text-gray-500">No Records Yet!</p>
                  )}
             </div>
            <button
              className="h-10 w-10 bg-red-500 text-white absolute top-4 right-8 z-10 rounded-full hover:bg-red-600 flex items-center justify-center"
              onClick={handleClose}
            >
              <span className="text-2xl font-bold">×</span>
            </button>
          </div>
          </div>
        </>}



        {clicked  && category === "Animal Movements" && (<div className='flex justify-center items-center z-1000 h-[100vh] w-[100vw] absolute'>
          <div className=' bg-black absolute h-[100%] w-[100%]  opacity-50'></div>
          <div className="flex justify-center items-center h-fit w-fit absolute">
            <img src={popUp} alt="Pop up background" className="w-[85%]" />
                 <p className='absolute z-10 top-10 text-6xl'>
                  {category}
                </p>
                <div className="absolute h-[100%] w-[100%] content-end  justify-items-center mt-4 text-lg text-black p-4 rounded">
                  {childRecord.length  > 0 ?  <>
                       <div className=' absolute top-[20%] overflow-y-auto bg-amber-200 max-h-[60%] h-[60%] w-[80%] text-center '>
                    <table className='h-[100%] w-[100%] '>
                      <thead className='border-4'>
                      <tr>
                        <th className='border-r-4'>Lesson/Activity</th>
                        <th className='border-r-4'>Time</th>
                        <th className='border-r-4'>Star</th>
                      </tr>
                      </thead>
                   
                      <tbody className='border-4'>
                        {childRecord.filter(record => record.game_level.game_name === "Lesson2 Activity2" || record.game_level.game_name === "Lesson2 Activity1")
                              .map((record, id) => (
                              <tr key={id}>
                      
                              <td>{record.game_level.game_name}</td>
                              <td>{record.time}</td>
                              <td>{record.star} ⭐</td>
                              </tr>
                        ))}
                         
                      </tbody>
                    </table>
                     </div>
                  
                  <div className="text-5xl bottom-0 absolute">
                    {child.child_full_name}
                  </div>
                 </> : (
                    <p className="text-gray-500">No Records Yet!</p>
                  )}
             </div>
            <button
              className="h-10 w-10 bg-red-500 text-white absolute top-4 right-8 z-10 rounded-full hover:bg-red-600 flex items-center justify-center"
              onClick={handleClose}
            >
              <span className="text-2xl font-bold">×</span>
            </button>
          </div>
          </div>
        )}

       {clicked  && category === "Baby Animals" && (<div className='flex justify-center items-center z-1000 h-[100vh] w-[100vw] absolute'>
        <div className=' bg-black absolute h-[100%] w-[100%]  opacity-50'></div>
          <div className="flex justify-center items-center h-fit w-fit absolute">
            <img src={popUp} alt="Pop up background" className="w-[85%]" />
                 <p className='absolute z-10 top-10 text-6xl'>
                  {category}
                </p>
                <div className="absolute h-[100%] w-[100%] content-end  justify-items-center mt-4 text-lg text-black p-4 rounded">
                  {childRecord.length  > 0 ?  <>
                       <div className=' absolute top-[20%] overflow-y-auto bg-amber-200 max-h-[60%] h-[60%] w-[80%] text-center '>
                    <table className='h-[100%] w-[100%] '>
                      <thead className='border-4'>
                      <tr>
                        <th className='border-r-4'>Lesson/Activity</th>
                        <th className='border-r-4'>Time</th>
                        <th className='border-r-4'>Star</th>
                      </tr>
                      </thead>
                   
                      <tbody className='border-4'>
                        {childRecord.filter(record => record.game_level.game_name === "Lesson3 Activity1" || record.game_level.game_name === "Lesson3 Activity2")
                              .map((record, id) => (
                              <tr key={id}>
                    
                              <td className='border-r-4'>{record.game_level.game_name}</td>
                              <td className='border-r-4'>{record.time}</td>
                              <td className='border-r-4'>{record.star} ⭐</td>
                              </tr>
                        ))}
                         
                      </tbody>
                    </table>
                     </div>
                  
                  <div className="text-5xl bottom-0 absolute">
                    {child.child_full_name}
                  </div>
                 </> : (
                    <p className="text-gray-500">No Records Yet!</p>
                  )}
             </div>
            <button
              className="h-10 w-10 bg-red-500 text-white absolute top-4 right-8 z-10 rounded-full hover:bg-red-600 flex items-center justify-center"
              onClick={handleClose}
            >
              <span className="text-2xl font-bold">×</span>
            </button>
          </div>
          </div>
        )}

               {clicked  && category === "Pet or Wild" && (<div className='flex justify-center items-center z-1000 h-[100vh] w-[100vw] absolute'>
                <div className=' bg-black absolute h-[100%] w-[100%] opacity-50 '></div>
          <div className="flex justify-center items-center h-fit w-fit absolute">
            <img src={popUp} alt="Pop up background" className="w-[85%]" />
                 <p className='absolute z-10 top-10 text-6xl'>
                  {category}
                </p>
                <div className="absolute h-[100%] w-[100%] content-end  justify-items-center mt-4 text-lg text-black p-4 rounded">
                  {childRecord.length  > 0 ?  <>
                       <div className=' absolute top-[20%] overflow-y-auto bg-amber-200 max-h-[60%] h-[60%] w-[80%] text-center '>
                    <table className='h-[100%] w-[100%] '>
                      <thead className='border-4'>
                      <tr >
                        <th className='border-4'>Difficulty</th>
                        <th className='border-4'>Level</th>
                        <th className='border-4'>Time</th>
                        <th className='border-4'>Star</th>
                      </tr>
                      </thead>
                   
                      <tbody className='border-4'>
                        {childRecord.filter(record => record.game_level.game_name === " Lesson5 Activity1"  || record.game_level.game_name === "Lesson5 Activity2")
                              .map((record, id) => (
                              <tr key={id}    >
                   
                              <td className='border-r-4'>{record.game_level.difficulty}</td>
                              <td className='border-r-4'>{record.game_level.level}</td>
                              <td className='border-r-4'>{record.time}</td>
                              <td className='border-r-4'>{record.star} ⭐</td>
                              </tr>
                        ))}
                         
                      </tbody>
                    </table>
                     </div>
                  
                  <div className="text-5xl bottom-0 absolute">
                    {child.child_full_name}
                  </div>
                 </> : (
                    <p className="text-gray-500">No Records Yet!</p>
                  )}
             </div>
            <button
              className="h-10 w-10 bg-red-500 text-white absolute top-4 right-8 z-10 rounded-full hover:bg-red-600 flex items-center justify-center"
              onClick={handleClose}
            >
              <span className="text-2xl font-bold">×</span>
            </button>
          </div>
          </div>
        )}  

        {clicked  && category === "Animal Habitat" && (<div className='flex justify-center items-center z-1000 h-[100vh] w-[100vw] absolute'>
                <div className=' bg-black absolute h-[100%] w-[100%] opacity-50 '></div>
          <div className="flex justify-center items-center h-fit w-fit absolute">
            <img src={popUp} alt="Pop up background" className="w-[85%]" />
                 <p className='absolute z-10 top-10 text-6xl'>
                  {category}
                </p>
                <div className="absolute h-[100%] w-[100%] content-end  justify-items-center mt-4 text-lg text-black p-4 rounded">
                  {childRecord.length  > 0 ?  <>
                       <div className=' absolute top-[20%] overflow-y-auto bg-amber-200 max-h-[60%] h-[60%] w-[80%] text-center '>
                    <table className='h-[100%] w-[100%] '>
                      <thead className='border-4'>
                      <tr >
                        <th className='border-4'>Difficulty</th>
                        <th className='border-4'>Level</th>
                        <th className='border-4'>Time</th>
                        <th className='border-4'>Star</th>
                      </tr>
                      </thead>
                  
                      <tbody className='border-4'>
                        {childRecord.filter(record => record.game_level.game_name === "Lesson4 Activity1"  || record.game_level.game_name === " Lesson4 Activity2" )
                              .map((record, id) => (
                              <tr key={id}    >
                   
                              <td className='border-r-4'>{record.game_level.difficulty}</td>
                              <td className='border-r-4'>{record.game_level.level}</td>
                              <td className='border-r-4'>{record.time}</td>
                              <td className='border-r-4'>{record.star} ⭐</td>
                              </tr>
                        ))}
                         
                      </tbody>
                    </table>
                     </div>
                  
                  <div className="text-5xl bottom-0 absolute">
                    {child.child_full_name}
                  </div>
                 </> : (
                    <p className="text-gray-500">No Records Yet!</p>
                  )}
             </div>
            <button
              className="h-10 w-10 bg-red-500 text-white absolute top-4 right-8 z-10 rounded-full hover:bg-red-600 flex items-center justify-center"
              onClick={handleClose}
            >
              <span className="text-2xl font-bold">×</span>
            </button>
          </div>
          </div>
        )}  


      </div>


      
      {loading && <LoadingIndicator/>}
    </>
  );
}


export default ParentsDashboard;
