import { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";
import React from "react";

import SortingGame from "../components/MediumColorGame";
import redJar from "../assets/Color/Medium/redjar.webp";
import yellowJar from "../assets/Color/Medium/yellowjar.webp";
import blueJar from "../assets/Color/Medium/bluejar.webp";


import apple from "../assets/Color/Medium/apple.webp";    
import banana from "../assets/Color/Medium/banana.webp";   
import balloon from "../assets/Color/Medium/balloon.webp";  

import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 

import backgroundMusic from "../assets/Sounds/background.mp3";

import { motion } from "framer-motion";

import applause from "../assets/Sounds/applause.wav"
import { useWithSound } from "../components/useWithSound";
import { useNavigate } from "react-router-dom";


function ColorGameMedLevel1() {
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause); 
   const [isGameFinished,setGameFinished]= useState(false);
    const [count, setCount] = useState(0);

  const jars = [
    { id: "red", img: redJar },
    { id: "yellow", img: yellowJar },
    { id: "blue", img:  blueJar },      

  ];
  
useEffect(() => {
                          if (isGameFinished) return; 
                      
                          const interval = setInterval(() => {
                            setCount((prev) => prev + 1);
                          }, 1000);
                      
                          return () => clearInterval(interval); 
                        }, [isGameFinished]);
                
              
            
              const [index] = useState(0);
            
              const logic = (choice) => {
                if (choice === clickables[index].Answer) {
                  setGameFinished(true);
                } else {
                  alert("wrong!");
                }
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
            
           
            

{/* draggables*/}

  const itemsData = [
    { id: "apple-1", type: "apple", img: apple, correctJar: "red", x: 120, y: 200 },
    { id: "balloon-1", type: "balloon", img: balloon, correctJar: "blue", x: 260, y: 50 },
    { id: "banana-1", type: "banana", img: banana, correctJar: "yellow", x:360, y: 200 },

    { id: "apple-2", type: "apple", img: apple, correctJar: "red", x:  500, y: 50},
    { id: "balloon-2", type: "balloon", img: balloon, correctJar: "blue", x: 640, y: 200 },
    { id: "banana-2", type: "banana", img: banana, correctJar: "yellow", x: 760, y: 50 },



    { id: "apple-3", type: "apple", img: apple, correctJar: "red",x: 860, y: 200},    
    { id: "balloon-3", type: "balloon", img: balloon, correctJar: "blue", x: 980, y: 50 },
    { id: "banana-3", type: "banana", img: banana, correctJar: "yellow", x: 1070, y: 200 },

  
  ];

  const starImages = { one: OneStar, two: TwoStar, three: ThreeStar };

  return <SortingGame jars={jars} itemsData={itemsData} starImages={starImages} />;
}

export default ColorGameMedLevel1;

            
           