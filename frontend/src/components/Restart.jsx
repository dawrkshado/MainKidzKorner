import Replayimg from "../assets/Back n Replay/Replay.webp"

function Restart (){
const Replay = () =>{window.location.reload();}


     return(<>
     <div onClick={Replay}><img src={Replayimg} alt="restart button" className="h-30 w-30 hover:cursor-pointer"/></div>
     </>)

}
export default Restart;