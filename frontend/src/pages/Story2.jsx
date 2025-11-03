import TopBar from "../components/TopBar";
import Back from "../components/Back";

function Story2(){
  
  return(
    <>
 <div className="hidden w-auto md:inline md:absolute">
   <TopBar/>
  <Back/>
  <img src="/Bg/Story/storiescontentbg.png" 
  alt="ContentsBackground" 
  className="w-[100vw] h-[100%]"/>
 </div>
  </>
  );
  
}
export default Story2;