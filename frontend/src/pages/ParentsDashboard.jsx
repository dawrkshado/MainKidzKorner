import Back from '../components/Back';
import alphabetButton from "../assets/Parents/alphabet.webp";
import colorButton from "../assets/Parents/color.webp";
import shapeButton from "../assets/Parents/shapes.webp";
import numberButton from "../assets/Parents/number.webp";
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
    
           <Back/>
      <div
        className="hidden md:flex md:absolute items-center justify-center h-screen w-screen bg-cover bg-no-repeat"
        style={{ backgroundImage: `url("./Bg/parentsoverviewbg.png")` }}
      >
     
        
        {/* Buttons */}
        <div className="h-[100vh] w-fit flex flex-col items-center justify-center">
       
          <img src={alphabetButton} onClick={()=> handleClick ("Alphabet")} alt="Alphabet Button" className="cursor-pointer" />
          <img src={colorButton} onClick={()=> handleClick ("Color")} alt="Color Button" className="cursor-pointer" />
          <img src={shapeButton} onClick={()=> handleClick ("Shape")} alt="Shape Button" className="cursor-pointer" />
          <img src={numberButton} onClick={()=> handleClick ("Number")} alt="Number Button" className="cursor-pointer" />

        </div>

        {/* Pop-up */}
          {clicked  && category === "Alphabet" && <><div className='flex justify-center items-center z-1000 h-[100vh] w-[100vw] absolute'>
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
                        <th className='border-r-4'>Difficulty</th>
                        <th className='border-r-4'>Level</th>
                        <th className='border-r-4'>Time</th>
                        <th className='border-r-4'>Star</th>
                      </tr>
                      </thead>
                   
                      <tbody className='border-4'>
                        {childRecord.filter(record => record.game_level.game_name === "Alphabet")
                              .map((record, id) => (
                              <tr key={id}>
                      
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
        </>}



        {clicked  && category === "Color" && (<div className='flex justify-center items-center z-1000 h-[100vh] w-[100vw] absolute'>
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
                        <th className='border-r-4'>Difficulty</th>
                        <th className='border-r-4'>Level</th>
                        <th className='border-r-4'>Time</th>
                        <th className='border-r-4'>Star</th>
                      </tr>
                      </thead>
                   
                      <tbody className='border-4'>
                        {childRecord.filter(record => record.game_level.game_name === "Color")
                              .map((record, id) => (
                              <tr key={id}>
                      
                              <td>{record.game_level.difficulty}</td>
                              <td>{record.game_level.level}</td>
                              <td>{record.time}</td>
                              <td>{record.star} ⭐</td>
                              </tr>
                        ))}
                         
                      </tbody>
                    </table>
                     </div>
                  
                  <div className="text-5xl bottom-0 absolute">
                    {child.first_name}
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

       {clicked  && category === "Shape" && (<div className='flex justify-center items-center z-1000 h-[100vh] w-[100vw] absolute'>
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
                        <th className='border-r-4'>Difficulty</th>
                        <th className='border-r-4'>Level</th>
                        <th className='border-r-4'>Time</th>
                        <th className='border-r-4'>Star</th>
                      </tr>
                      </thead>
                   
                      <tbody className='border-4'>
                        {childRecord.filter(record => record.game_level.game_name === "Shape")
                              .map((record, id) => (
                              <tr key={id}>
                    
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
                    {child.first_name}
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

               {clicked  && category === "Number" && (<div className='flex justify-center items-center z-1000 h-[100vh] w-[100vw] absolute'>
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
                        {childRecord.filter(record => record.game_level.game_name === "Number")
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
                    {child.first_name}
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
