import 'react-router-dom'
import crec from '../assets/Alphabets/crec.mp4'
import Back from '../components/Back'

function C(){

  return(<>
 <Back/>
  <div className="hidden w-full md:inline md:absolute h-[100%]">
    <img src="./Bg/Alphabets/alphabetsabcd.webp" alt="ABCD Background" className="w-full"/>

     <div className="absolute inset-0 flex justify-center items-center z-10">
        <video
        src={crec}
        loop
        controls
        className="absolute top-[13%] left-[0%] w-[68%] h-[75%] rounded-2xl"
        />
        </div> 
  </div>
  </>)

}
export default C

