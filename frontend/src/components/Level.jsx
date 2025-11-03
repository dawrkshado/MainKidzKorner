import TopBar from "../components/TopBar.jsx";
import { Link, useLocation } from 'react-router-dom'

function Level({}){

  const location = useLocation();   
  const currentPath = location.pathname;
      const getBasePath = () =>{


          if(currentPath.includes("/shapes")){
            return '/shapes';
          }
          else if(currentPath.includes("/numbers")){
            return '/numbers';
          }
          else if (currentPath.includes("/alphabets")){
            return '/alphabets';
          }
          return '';
      };
           const basePath = getBasePath();
      if(currentPath.includes({basePath})){
       return '';
      }
      else{
         return(
      <>
      <div className="flex h-screen w-full  justify-center">
        <Link to={`${basePath}/easy`}><div className="bg-amber-200 h-20 w-20"> easy </div></Link>
        <Link to={`${basePath}/medium`}> <div className="bg-pink-400 h-20 w-20">medium</div></Link>
        <Link to={`${basePath}/hard`}><div className="bg-green-800 h-20 w-20"> hardest</div></Link>
      </div>
      </>
    )
      }
    
       
    
}

export default Level
