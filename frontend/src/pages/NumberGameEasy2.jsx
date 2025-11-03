import { useState,useEffect } from "react";
import bg from "../assets/Number/Easy/bglvl3.webp";
import wrongImage from "../assets/Alphabets/Hard/cross.gif" 

import six from "../assets/Number/Easy/One.webp";
import seven from "../assets/Number/Easy/Two.webp";
import eight from "../assets/Number/Easy/three.webp";
import nine from "../assets/Number/Easy/four.webp";
import ten from "../assets/Number/Easy/five.webp";

import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 

import ReplayNBack from "../components/ReplayNBack";

import backgroundMusic from "../assets/Sounds/background.mp3";

import applause from "../assets/Sounds/applause.wav"
import { useWithSound } from "../components/useWithSound";
import { useNavigate } from "react-router-dom";
import useSound from 'use-sound';
import clickSfx from '../assets/Sounds/wrong_effect.mp3'; 

import { motion } from "framer-motion";

function saveProgress(level) {
  const progress = JSON.parse(localStorage.getItem("numberEasyProgress")) || {
    level1: false,
    level2: false,
    level3: false,
  };
  progress[level] = true;
  localStorage.setItem("numberEasyProgress", JSON.stringify(progress));
}

function NumberGameEasy2 () {
     const [playClick] = useSound(clickSfx, { volume: 0.5 });
    const [clicked, setClicked] = useState([]);
    const [showWrong, setShowWrong] = useState(false);
    const [count, setCount] = useState(0);
      const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);

  
const numbers = [
        { value: 6, img:six, top: 10, left: 80, color: 'bg-red-500',width: 35, height: 35 },
        { value: 7, img:seven, top: 300, left: 250, color: 'bg-blue-500' , width: 35, height: 35},
        { value: 8, img:eight, top: 450, left: 700, color: 'bg-green-500' , width: 35, height: 35},
        { value: 9, img:nine, top: 50, left: 450, color: 'bg-yellow-500',width: 35, height: 35 },
        { value: 10, img:ten, top: 460, left: 100, color: 'bg-purple-500' ,width: 35, height: 35},
    ];

    const isGameFinished = clicked.length === numbers.length;

   const startingValue = numbers.length > 0 ? numbers[0].value : 0; 
    const nextExpectedValue = startingValue + clicked.length;

    const handleBackgroundClick = () => {
        if (!isGameFinished) {
           playClick();
            setShowWrong(true);
            setTimeout(() => setShowWrong(false), 2500);
        }
    };

   const handleClick = (itemValue, e) => {
        e.stopPropagation();
        
        if (isGameFinished || clicked.includes(itemValue)) return;
    
        if (itemValue === nextExpectedValue) {
            setClicked([...clicked, itemValue]);
        } else {
            // Trigger wrong click feedback
            playClick();
            setShowWrong(true);
            setTimeout(() => setShowWrong(false), 800); // Use a shorter timeout
        }
    };

    const resetGame = () => {
        setClicked([]);
        setCount(0);
        stopApplause(); 
    };

    useEffect(() => {
        if (isGameFinished) return;

        const interval = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isGameFinished]);

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

    useEffect(() => {
        let soundTimeout;

        if (isGameFinished) {
            playApplause();
            saveProgress("level2");

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
    <div className="absolute w-[100vw] h-[100vh] font-[coiny]"  onClick={handleBackgroundClick}>
      <img src={bg} alt="background" className="absolute w-full h-full" />
      
 
       <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>
  {numbers.map((num, i) => (
        <div
          key={i}
          className="absolute cursor-pointer"
          style={{ top: num.top, left: num.left }}
          onClick={(e) => handleClick(num.value, e)}
        >
          {!clicked.includes(num.value) && (
            <img
            src={num.img}
            alt={`Number ${num.value}`}
            style={{ width: num.width, height: num.height }}
            className="object-contain"
            />

          )}
        </div>
      ))}


  {/* Wrong Image*/}
                    {showWrong && (
                      <div className="absolute inset-0 flex items-center justify-center  z-30 pointer-events-none h-[100vh] w-[100vw]">
                        <img
                          src={wrongImage}
                          alt="Wrong"
                          className="h-[300px]"
                        />
                      </div>
                    )}
      

 {/*Results*/}
        {isGameFinished && count <= 10 && (
          <div className="absolute inset-0 flex items-center h-full w-full justify-center bg-opacity-50 z-20">
            <motion.img
              src={ThreeStar}
              alt="Game Completed!"
              className="h-[300px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
             <div className="absolute bottom-[20%]">
             <ReplayNBack />
              </div>
          </div>
        )}

{isGameFinished && count <= 15 && count > 10 &&(
  <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
       <motion.img
       src={TwoStar}
       alt="Game Completed!"
       className="h-[300px]"
       initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
                 />
      <div className="absolute bottom-[20%] ">
        <ReplayNBack/>
      </div>
  </div>
)}

{isGameFinished && count > 15 &&(
  <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
     <motion.img
      src={OneStar}
      alt="Game Completed!"
      className="h-[300px]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
               />
    <div className="absolute bottom-[20%] ">
      <ReplayNBack/>
    </div>
  </div>
)}

      
    </div>
  );
}

export default NumberGameEasy2;

