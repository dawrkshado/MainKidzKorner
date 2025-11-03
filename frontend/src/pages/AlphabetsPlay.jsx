import { Link } from "react-router-dom"
import easyalpha from "../assets/Alphabets/easyalpha.png";
import mediumalpha from "../assets/Alphabets/mediumalpha.png";
import alphahard from "../assets/Alphabets/alphahard.png";
import Back from "../components/Back";
import useSound from 'use-sound';
import clickSfx from '../assets/Sounds/button_click.mp3';
import { useState,useEffect } from "react";
import backgroundMusic from "../assets/Sounds/background.mp3"; 

function AlphabetsPlay(){
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

<div className="hidden w-full md:inline md:absolute h-[100%]">

          <Back/>
        <img
        src="/Bg/Alphabets/alphabetsgamepage.webp"
        alt="bg for Alpha"
        className="w-full"
        />

        <Link to="/alphabeteasy" onClick={playClick}>
        <img 
        src={easyalpha} 
        alt="Easy Button"
        className="absolute left-[5%] top-[13%] w-auto cursor-pointer" />
        </Link>

        <Link to="/alphabetmedium" onClick={playClick}>
        <img
        src={mediumalpha}
        alt="Medium Button"
        className="absolute left-[30%] top-[43%] w-auto cursor pointer"/>
        </Link>
        <Link to="/alphabethard" onClick={playClick}>
        <img
        src={alphahard}
        alt="Hard Button"
        className="absolute left-[55%] top-[73%] w-auto cursor pointer"/>
        </Link>
    </div>
  </>
  );
  
}
export default AlphabetsPlay