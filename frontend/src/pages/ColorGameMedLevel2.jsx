import { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";
import React from "react";

import SortingGame from "../components/MediumColorGame";
import redJar from "../assets/Color/Medium/redjar.webp";
import yellowJar from "../assets/Color/Medium/yellowjar.webp";
import blueJar from "../assets/Color/Medium/bluejar.webp";
import orangeJar from "../assets/Color/Medium/orangeJar.webp";
import greenJar from "../assets/Color/Medium/greenJar.webp";
import purpleJar from "../assets/Color/Medium/purpleJar.webp"


import eggplant from "../assets/Color/Medium/eggplant.webp";    
import orange from "../assets/Color/Medium/orange.webp";   
import star from "../assets/Color/Medium/star.webp";  
import leaf from "../assets/Color/Medium/leaf.webp";  
import balloon from "../assets/Color/Medium/greenBalloon.webp"; 
import butterfly from "../assets/Color/Medium/butterfly.webp";
import heart from "../assets/Color/Medium/heart.webp";
import basketball from "../assets/Color/Medium/basketball.webp";
import key from "../assets/Color/Medium/key.webp";
import watermelon from "../assets/Color/Medium/watermelon.webp"

import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 
import backgroundMusic from "../assets/Sounds/background.mp3";

import { motion } from "framer-motion";

import applause from "../assets/Sounds/applause.wav"
import { useWithSound } from "../components/useWithSound";
import { useNavigate } from "react-router-dom";

function ColorGameMedLevel2() {
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause); 
    const [isGameFinished, setGameFinished] = useState(false);

  const jars = [
    { id: "red", img: redJar },
    { id: "yellow", img: yellowJar },
    { id: "orange", img: orangeJar},
    { id: "green", img: greenJar},
    { id: "purple",img: purpleJar}

  
  ];
{/* draggables*/}
  const itemsData = [
    { id: "eggplant", type: "eggplant", img: eggplant, correctJar: "purple", x: 120, y: 20 },
    { id: "orangeFruit", type: "orangeFruit", img: orange, correctJar: "orange", x: 300, y: 50 },
    { id: "star", type: "star", img: star, correctJar: "yellow",x:450, y: 20}, 
    { id: "leaf", type: "leaf", img: leaf, correctJar: "green",x: 150, y: 150},
    { id: "balloon", type: "balloon", img: balloon, correctJar: "green",x: 400, y: 200},
    { id: "butterfly", type: "butterfly", img: butterfly, correctJar: "purple",x: 790, y: 160},
    { id: "heart", type: "heart", img: heart, correctJar: "red",x: 600, y: 140},
    { id: "basketball", type: "basketball", img: basketball, correctJar: "orange",x: 720, y: 20},
    { id: "key", type: "key", img: key, correctJar: "yellow", x:1000, y: 20},
    { id: "watermelon", type: "watermelon", img: watermelon, correctJar: "red",x: 1060, y: 200}
  
  ];

 const starImages = { one: OneStar, two: TwoStar, three: ThreeStar };

    const handleGameCompletion = () => {
        setGameFinished(true);
    };
    
    useEffect(() => {
        const bgSound = new Audio(backgroundMusic);
        bgSound.loop = true; 
        bgSound.volume = 0.3; 
        
        bgSound.play().catch((err) => {
            console.log("Autoplay blocked by browser (user interaction required):", err);
        });

        return () => {
            bgSound.pause();
            bgSound.currentTime = 0;
        };
    }, []); 

 
    useEffect(() => {
    if (isGameFinished) {
        playApplause(); 
    }

}, [isGameFinished, playApplause, stopApplause]);
    useEffect(() => {
        let soundTimeout;

        if (isGameFinished) {
            console.log("Game finished! Playing applause.");
            playApplause(); 

            soundTimeout = setTimeout(() => {
                stopApplause();
            }, 8000); 
        }

  
        return () => {
            clearTimeout(soundTimeout);
            stopApplause();
        };
    }, [isGameFinished, playApplause, stopApplause]);

return (
        <SortingGame 
            jars={jars} 
            itemsData={itemsData} 
            starImages={starImages} 
            onGameFinished={handleGameCompletion} 
            stopApplause={stopApplause}
        />
    );
}


export default ColorGameMedLevel2;
