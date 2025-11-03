
import Back from "../components/Back";
import Book1 from "../assets/Stories/Story1.webp"
import Book2 from "../assets/Stories/Story2.webp"
import Book3 from "../assets/Stories/Story3.webp"
import { Link } from 'react-router-dom'


    function Stories(){
          return(
          
            <>
             <div className="hidden w-[100vw] md:inline md:absolute h-[100%] overflow-x-hidden">
              <Back/>
              <img src="./Bg/storiesbg.png" alt="LibraryBackground" className="w-[100vw] h-[100%]" />
              <Link to={"/stories/story1"}><img src={Book1} alt="ButtonForStory1" className="absolute bottom-[48%] right-[45%] h-[22%] motion-preset-pulse-sm motion-duration-2000"/></Link>
              <Link to={"/stories/story2"}><img src={Book2} alt="ButtonForStory2" className="absolute bottom-[20%] left-[25%] h-[22%] motion-preset-pulse-sm motion-duration-2000"/></Link>
              <Link to={"/stories/story3"}><img src={Book3} alt="ButtonForStory3" className="absolute top-[82%] left-[2%] h-[22%] motion-preset-pulse-sm motion-duration-2000"/></Link>
            </div>
            </>
            
            );
    }

    export default Stories