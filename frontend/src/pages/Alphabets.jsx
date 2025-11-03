import useSound from 'use-sound';
import clickSfx from '../assets/Sounds/button_click.mp3'; 
import { Link } from 'react-router-dom';
import backgroundMusic from "../assets/Sounds/background.mp3";
import { useState,useEffect } from "react"

import A from "../assets/Alphabets/A.webp";
import B from "../assets/Alphabets/B.webp";
import C from "../assets/Alphabets/C.webp";
import D from "../assets/Alphabets/D.webp";
import E from "../assets/Alphabets/E.webp";
import F from "../assets/Alphabets/F.webp";
import G from "../assets/Alphabets/G.webp";
import H from "../assets/Alphabets/H.webp";
import I from "../assets/Alphabets/I.webp";
import J from "../assets/Alphabets/J.webp";
import K from "../assets/Alphabets/K.webp";
import L from "../assets/Alphabets/L.webp";
import M from "../assets/Alphabets/M.webp";
import N from "../assets/Alphabets/N.webp";
import O from "../assets/Alphabets/O.webp";
import P from "../assets/Alphabets/P.webp";
import Q from "../assets/Alphabets/Q.webp";
import R from "../assets/Alphabets/R.webp";
import S from "../assets/Alphabets/S.webp";
import T from "../assets/Alphabets/T.webp";
import U from "../assets/Alphabets/U.webp";
import V from "../assets/Alphabets/V.webp";
import W from "../assets/Alphabets/W.webp";
import X from "../assets/Alphabets/X.webp";
import Y from "../assets/Alphabets/Y.webp";
import Z from "../assets/Alphabets/Z.webp";
import Back from "../components/Back";



function Alphabets(){   
    const [playClick] = useSound(clickSfx, { volume: 0.5 });

     useEffect(() => {
           const bgSound = new Audio(backgroundMusic);
            bgSound.loop = true;
            bgSound.volume = 0.2; 
    
            bgSound.play().catch((err) => {
                console.log("Autoplay blocked. User must interact to enable sound.", err);
            });
    
            return () => {
                bgSound.pause();
                bgSound.currentTime = 0;
            };
        }, []); 
    
    
    return(
<>  

            <Back/>
<div className="hidden w-full md:inline md:absolute h-[100%]">
        <img src="./Bg/Alphabets/alphabetbg.webp" alt="chalkBoard Background" className="w-full"/>
   <Link to="/A" onClick={playClick}>
       <img src={A} alt="Button A" className="absolute top-[7%] left-[-3%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
<Link to="/B" onClick={playClick}>
       <img src={B} alt="Button B" className="absolute top-[7%] left-[12%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/C"  onClick={playClick}>
       <img src={C} alt="Button C" className="absolute top-[9%] left-[27%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/D" onClick={playClick}>
       <img src={D} alt="Button D" className="absolute top-[9%] left-[42%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/E" onClick={playClick}>
       <img src={E} alt="Button E" className="absolute top-[7%] left-[55%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/F" onClick={playClick}>
       <img src={F} alt="Button F" className="absolute top-[7%] left-[67%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/G" onClick={playClick}>
       <img src={G} alt="Button G" className="absolute top-[7%] left-[80%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/H" onClick={playClick}>
       <img src={H} alt="Button H" className="absolute top-[32%] left-[-3%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/I" onClick={playClick}>
       <img src={I} alt="Button I" className="absolute top-[32%] left-[12%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/J"onClick={playClick}>
       <img src={J} alt="Button J" className="absolute top-[32%] left-[27%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/K" onClick={playClick}>
       <img src={K} alt="Button K" className="absolute top-[32%] left-[42%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/L" onClick={playClick}>
       <img src={L} alt="Button L" className="absolute top-[32%] left-[55%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/M" onClick={playClick}>
       <img src={M} alt="Button M" className="absolute top-[32%] left-[67%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/N" onClick={playClick}>
       <img src={N} alt="Button N" className="absolute top-[32%] left-[80%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/O" onClick={playClick}>
       <img src={O} alt="Button O" className="absolute top-[57%] left-[-3%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/P" onClick={playClick}>
       <img src={P} alt="Button P" className="absolute top-[57%] left-[12%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/Q" onClick={playClick}>
       <img src={Q} alt="Button Q" className="absolute top-[57%] left-[27%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/R" onClick={playClick}>
       <img src={R} alt="Button R" className="absolute top-[57%] left-[42%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/S" onClick={playClick}>
       <img src={S} alt="Button S" className="absolute top-[57%] left-[55%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/T" onClick={playClick}>
       <img src={T} alt="Button T" className="absolute top-[57%] left-[67%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/U" onClick={playClick}>
       <img src={U} alt="Button U" className="absolute top-[57%] left-[80%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/V" onClick={playClick}>
       <img src={V} alt="Button V" className="absolute top-[82%] left-[-3%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/W" onClick={playClick}>
       <img src={W} alt="Button W" className="absolute top-[82%] left-[12%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/X" onClick={playClick}>
       <img src={X} alt="Button X" className="absolute top-[82%] left-[27%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/Y" onClick={playClick}>
       <img src={Y} alt="Button Y" className="absolute top-[82%] left-[42%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link>
   <Link to="/Z" onClick={playClick}>
       <img src={Z} alt="Button Z" className="absolute top-[82%] left-[55%] bottom-[43%] h-[21%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000" />
   </Link >
  <Link to={"/alphabets/play"} onClick={playClick}><div className="h-[20%] w-[20%] bg-fuchsia-600 absolute bottom-0 right-25"><h1 className="text-9xl">PLAY</h1></div></Link>
</div>
</>
    );
}
export default Alphabets