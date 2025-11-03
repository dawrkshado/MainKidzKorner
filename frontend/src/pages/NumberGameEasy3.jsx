import { useState,useEffect } from "react";
import bg from "../assets/Number/Easy/bglvl2.webp";
import wrongImage from "../assets/Alphabets/Hard/cross.gif" 

import one from "../assets/Number/Easy/One.webp";
import two from "../assets/Number/Easy/Two.webp";
import three from "../assets/Number/Easy/three.webp";
import four from "../assets/Number/Easy/four.webp";
import five from "../assets/Number/Easy/five.webp";
import six from "../assets/Number/Easy/six.webp";
import seven from "../assets/Number/Easy/seven.webp";
import eight from "../assets/Number/Easy/eight.webp";
import nine from "../assets/Number/Easy/nine.webp";
import ten from "../assets/Number/Easy/ten.webp";

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

function NumberGameEasy3 () {
     const [playClick] = useSound(clickSfx, { volume: 0.5 });
    const [clicked, setClicked] = useState([]);
    const [showWrong, setShowWrong] = useState(false);
    const [count, setCount] = useState(0);
   const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);


  const numbers = [
  { value: 1, img: one, top: 550, left: 700, width: 40, height: 40 },
  { value: 2, img: two, top: 560, left: 440, width: 40, height: 40 },
  { value: 3, img: three, top: 500, left: 1110, width: 40, height: 40 },
  { value: 4, img: four,top: 40, left: 1060, width: 50, height: 50},
  { value: 5, img: five, top: 70, left: 30, width: 40, height: 40 },
  { value: 6, img: six, top: 300, left: 1180, width: 60, height: 60 },
  { value: 7, img: seven, top: 350, left: 50, width: 40, height: 40 },
  { value: 8, img: eight,  top: 260, left: 250, width: 60, height: 60 },
  { value: 9, img: nine, top: 160, left: 650, width: 40, height: 40},
  { value: 10, img: ten, top: 510, left: 230, width: 40, height: 40 },

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

    const handleClick = (item, e) => {
        e.stopPropagation();
        if (!clicked.includes(item)) {
            setClicked([...clicked, item]);
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
            saveProgress("level3");

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
    <div className="absolute w-[100vw] h-[100vh] font-[coiny]" onClick={handleBackgroundClick}>
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

export default NumberGameEasy3;
