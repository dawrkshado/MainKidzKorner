import { useState, useEffect} from "react"
import i from "../assets/Alphabets/Easy/letterI.webp";
import j from "../assets/Alphabets/Easy/letterJ.webp";
import k from "../assets/Alphabets/Easy/letterK.webp";
import l from "../assets/Alphabets/Easy/letterL.webp";


import bg from "../assets/Alphabets/Easy/bg.webp";
import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 

import ReplayNBack from "../components/ReplayNBack";

import backgroundMusic from "../assets/Sounds/background.mp3";

import { motion } from "framer-motion";

import applause from "../assets/Sounds/applause.wav"
import { useWithSound } from "../components/useWithSound";
import { useNavigate } from "react-router-dom";
import useSound from 'use-sound';
import clickSfx from '../assets/Sounds/wrong_effect.mp3'; 
const PROGRESS_KEY = 'alphabetEasyProgress'; 

// Function to save completion status
function saveProgress(level) {
  const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {
    level1: false,
    level2: false,
    level3: false,
  };
  progress[level] = true;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function ShapesEasyLevel3() {
  const [playClick] = useSound(clickSfx, { volume: 0.5 });
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause); 
  const clickables = [
    {
      Answer: "K",
      choices: [
        { value: "I", img: i },
        { value: "J", img: j },
        { value: "K", img: k },
        { value: "L", img: l }
      ]
    }
  ];

  const [isGameFinished,setGameFinished]= useState(false);
  
    const [count, setCount] = useState(0);

          const handleBackgroundClick = () => {
        if (!isGameFinished) {
          playClick();
            setShowWrong(true);
            setTimeout(() => setShowWrong(false), 2500);
        }
    };

     const logic = (choice) => {
   if (isGameFinished) return;

   if (choice === clickables[index].Answer) {

      setGameFinished(true);
 } else {

      playClick(); 
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 2500);
      
   }
 };   
  
      useEffect(() => {
  if (isGameFinished) return; 
                                       
const interval = setInterval(() => {
setCount((prev) => prev + 1);
}, 1000);
                                       
return () => clearInterval(interval); 
}, [isGameFinished]);
 
const [index] = useState(0);
                          
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
                            
   useEffect(() => {
if (isGameFinished) return;                           
const interval = setInterval(() => {
setCount((prev) => prev + 1);
}, 1000);
                             
return () => clearInterval(interval);
}, [isGameFinished]);
                               
function handleDragEnd(event) {
if (event.over && event.active.id === event.over.id) { 
const draggedId = event.active.id;
const droppedId = event.over.id;
                             
setDropped((prev) => ({
...prev,
[draggedId]: droppedId,
}));
}
}
                             
const resetGame = () => {
setDropped({}); 
setCount(0);     
};
                             
const handleReplay = () => {
stopApplause(); 
resetGame();
};
                             
const handleBack = () => {
stopApplause(); 
navigate("/shapes");
};
                             
const isPlaced= (id) => dropped[id] === id;

  return (
    <><div className="font-[coiny]">
  
    <img src={bg} alt="background" className="w-full h-full"  />
     <h1 className="absolute top-15 right-149 text-3xl text-white font-[coiny]">Can You Find Letter {clickables[index].Answer}</h1>
 
    <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>
      <div className="flex justify-evenly justify-self-center w-150  absolute top-40">
        {clickables[index].choices.map((choice, i) => (
          <img
            key={i}
            onClick={() => logic(choice.value)}
            className="h-30 cursor-pointer"
            src={choice.img}
            alt={choice.value}
          />
        ))}
      </div>

 {/*Results*/}
        {isGameFinished && count <= 10 &&(
          <div className="absolute inset-0 flex items-center h-full w-full justify-center bg-opacity-50 z-20  ">
             <motion.img
               src={ThreeStar}
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
    </>
  );
}
export default ShapesEasyLevel3;
