import { Link } from "react-router-dom"
import coloreasy from "../assets/Color/coloreasy.png";
import colormedium from "../assets/Color/colormedium.png";
import colorhard from "../assets/Color/colorhard.png";
import Back from "../components/Back";
import { useState,useEffect } from "react";
import backgroundMusic from "../assets/Sounds/background.mp3"; 
import useSound from 'use-sound';
import clickSfx from '../assets/Sounds/button_click.mp3'; 



function ColorGame(){
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
    <div className="hidden w-full md:inline md:absolute h-auto">
        <Back/>
        <img
        src="/Bg/Color/colorlevelbg.webp"
        alt="background"
        className="w-full"
        />

        <Link to="/color/easy" onClick={playClick}>
        <img 
        src={coloreasy} 
        alt="Easy Button"
        className="absolute left-[5%] top-[13%] h-[25%] cursor-pointer" />
        </Link>

        <Link to="/color/medium" onClick={playClick}>
        <img
        src={colormedium}
        alt="Medium Button"
        className="absolute left-[30%] top-[43%] h-[25%] cursor pointer"/>
        </Link>
        <Link to="/color/hard" onClick={playClick}>
        <img
        src={colorhard}
        alt="Hard Button"
        className="absolute left-[55%] top-[73%] h-[25%] cursor pointer"/>
        </Link>
    </div>
  </>
  );
  
}
export default ColorGame