import { Link } from "react-router-dom";
import Back from "../components/Back";


import one from "../assets/Number/one.png";
import two from "../assets/Number/two.png";
import three from "../assets/Number/three.png";
import four from "../assets/Number/four.png";
import five from "../assets/Number/five.png";
import six from "../assets/Number/six.png";
import seven from "../assets/Number/seven.png";
import eight from "../assets/Number/eight.png";
import nine from "../assets/Number/nine.png";
import ten from "../assets/Number/ten.png";
import numberplay from "../assets/Number/numberplay.png";
import useSound from 'use-sound';
import clickSfx from '../assets/Sounds/button_click_sound.mp3'; 
import backgroundMusic from "../assets/Sounds/background.mp3"; 

import { useState,useEffect } from "react";

import oneRec from "../assets/Sounds/oneRec.mp3";
import twoRec from "../assets/Sounds/twoRec.mp3";
import threeRec from "../assets/Sounds/threeRec.mp3";
import fourRec from "../assets/Sounds/fourRec.mp3";
import fiveRec from "../assets/Sounds/fiveRec.mp3";
import sixRec from "../assets/Sounds/sixRec.mp3";
import sevenRec from "../assets/Sounds/sevenRec.mp3";
import eightRec from "../assets/Sounds/eightRec.mp3";
import nineRec from "../assets/Sounds/nineRec.mp3";
import tenRec from "../assets/Sounds/tenRec.mp3";


let currentAudio = null;
const playSound = (soundFile) => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = new Audio(soundFile);
  currentAudio.play();
};


function Number(){
  
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
  <><div className="hidden w-full h-full md:inline md:absolute">

    <Back/>
    <img
    src="./Bg/Number/numberpagebg.png"
    alt="background"
    className="w-full h-full"/>

        <img
          src={one}
          alt="One"
          onClick={() => playSound(oneRec)}
          className="absolute left-[1%] top-[47%] w-auto cursor-pointer h-auto"
        />

        <img
          src={two}
          alt="Two"
          onClick={() => playSound(twoRec)}
          className="absolute left-[10%] top-[47%] w-auto cursor-pointer h-auto"
        />

        <img
          src={three}
          alt="Three"
          onClick={() => playSound(threeRec)}
          className="absolute left-[18%] top-[47%] w-auto cursor-pointer h-auto"
        />

        <img
          src={four}
          alt="Four"
          onClick={() => playSound(fourRec)}
          className="absolute left-[27%] top-[47%] w-auto cursor-pointer h-auto"
        />

        <img
          src={five}
          alt="Five"
          onClick={() => playSound(fiveRec)}
          className="absolute left-[35%] top-[47%] w-auto cursor-pointer h-auto"
        />

        <img
          src={six}
          alt="Six"
          onClick={() => playSound(sixRec)}
          className="absolute left-[59%] top-[47%] w-auto cursor-pointer h-auto"
        />

        <img
          src={seven}
          alt="Seven"
          onClick={() => playSound(sevenRec)}
          className="absolute left-[67%] top-[47%] w-auto cursor-pointer h-auto"
        />

        <img
          src={eight}
          alt="Eight"
          onClick={() => playSound(eightRec)}
          className="absolute left-[75%] top-[47%] w-auto cursor-pointer h-auto"
        />

        <img
          src={nine}
          alt="Nine"
          onClick={() => playSound(nineRec)}
          className="absolute left-[82%] top-[47%] w-auto cursor-pointer h-auto"
        />

        <img
          src={ten}
          alt="Ten"
          onClick={() => playSound(tenRec)}
          className="absolute left-[90%] top-[47%] w-auto cursor-pointer h-auto"
        />


    <Link to="/numbergame">
    <img
    src={numberplay} onClick={() =>[playClick()]}
    alt="Buttons for Number Game"
    className="absolute left-[35%] top-[81%] w-auto cursor pointer h-auto"/>

    </Link>
  </div>
  </>

  );
}

export default Number;
