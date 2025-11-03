
import { Link } from "react-router-dom"
import numbereasy from "../assets/Number/numbereasy.png";
import numbermedium from "../assets/Number/numbermedium.png";
import numberhard from "../assets/Number/numberhard.png";
import Back from "../components/Back";

import useSound from 'use-sound';
import clickSfx from '../assets/Sounds/button_click.mp3'; 
import { useState,useEffect } from "react";
import backgroundMusic from "../assets/Sounds/background.mp3"; 

function NumberGame(){
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
  

  <div className="hidden w-full md:inline md:absolute overflow-x-hidden">
        <Back/>
        <img
        src="./Bg/Number/numbergamebg.png"
        alt="background"
        className="w-full"
        />

    <Link to="/numbereasy" onClick={playClick}>
            <img 
            src={numbereasy} 
            alt="Easy Button"
            className="absolute left-[5%] top-[13%] h-[25%] cursor-pointer" />
            </Link>

    <Link to="/numbermedium" onClick={playClick}>
            <img 
            src={numbermedium} 
            alt="Easy Button"
            className="absolute left-[30%] top-[43%] w-auto h-[25%] cursor-pointer" />
            </Link>
    
    <Link to="/numberhard" onClick={playClick}>
            <img 
            src={numberhard} 
            alt="Easy Button"
            className="absolute left-[55%] top-[73%] w-auto h-[25%] cursor-pointer" />
            </Link>
  </div>
  </>
  );

}
export default NumberGame