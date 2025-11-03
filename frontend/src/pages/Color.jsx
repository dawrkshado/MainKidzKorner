import apple from "../assets/Color/apple.png"
import avocado from "../assets/Color/avocado.png"
import banana from "../assets/Color/banana.png"
import blueberry from "../assets/Color/blueberry.png"
import dragonfruit from "../assets/Color/dragonfruit.png"
import grapes from "../assets/Color/grapes.png"
import orange from "../assets/Color/orange.png"
import colorbutton from "../assets/Color/colorbutton.png"

import { Link } from "react-router-dom";
import 'react-router-dom'
import useSound from 'use-sound';
import clickSfx from '../assets/Sounds/button_click.mp3';
import backgroundMusic from "../assets/Sounds/background.mp3"; 

import Back from "../components/Back.jsx";
import { useState,useEffect } from "react";


import redrec from "../assets/Sounds/redrec.mp3";
import greenrec from "../assets/Sounds/greenrec.mp3";
import yellowrec from "../assets/Sounds/yellowrec.mp3";
import bluerec from "../assets/Sounds/bluerec.mp3";
import pink from "../assets/Sounds/pink.mp3";
import violetrec from "../assets/Sounds/violetrec.mp3";
import orangerec from "../assets/Sounds/orangerec.mp3";


let currentAudio = null;
const playSound = (soundFile) => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = new Audio(soundFile);
  currentAudio.play();
};

function Color(){
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
        <> <div className="hidden w-full md:inline md:absolute h-full ">
      <Back/>
      <img 
      src="./Bg/Color/colorgamebg.webp"
      alt="background"
      className="w-full h-full"/>

  
        <img
          src={apple}
          alt="Apple is Red"
          onClick={() => playSound(redrec)}
          className="absolute left-[10%] top-[10%] w-auto cursor-pointer h-auto"
        />

        <img
          src={avocado}
          alt="Avocado is Green"
          onClick={() => playSound(greenrec)}
          className="absolute left-[30%] top-[10%] w-auto cursor-pointer h-auto"
        />

        <img
          src={banana}
          alt="Banana is Yellow"
          onClick={() => playSound(yellowrec)}
          className="absolute left-[50%] top-[10%] w-auto cursor-pointer h-auto"
        />

        <img
          src={blueberry}
          alt="Blueberry is Blue"
          onClick={() => playSound(bluerec)}
          className="absolute left-[70%] top-[10%] w-auto cursor-pointer h-auto"
        />

        <img
          src={dragonfruit}
          alt="Dragonfruit is Pink"
          onClick={() => playSound(pink)}
          className="absolute left-[30%] top-[50%] w-auto cursor-pointer h-auto"
        />

        <img
          src={grapes}
          alt="Grapes are Violet"
          onClick={() => playSound(violetrec)}
          className="absolute left-[70%] top-[47%] w-auto cursor-pointer h-auto"
        />

        <img
          src={orange}
          alt="Orange is Orange"
          onClick={() => playSound(orangerec)}
          className="absolute left-[53%] top-[50%] w-auto cursor-pointer h-auto"
        />

        <Link to="/colorgame">
          <img
            src={colorbutton}
            alt="Buttons for Color Game"
            className="absolute left-[40%] top-[85%] w-auto cursor-pointer h-auto"
          />
        </Link>
      </div>
    </>
  );
}

export default Color;
