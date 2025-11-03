import 'react-router-dom'
import TopBar from '../components/TopBar'
import Back from '../components/Back'

function R(){

  return(<>
  <TopBar/>
  <Back/>
  <div className="hidden w-full md:inline md:absolute h-[100%]">
    <img src="./Bg/Alphabets/alphabetsabcd.webp" alt="ABCD Background" className="w-full"/>
  </div>
  </>)

}
export default R

