import { useState,useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";

import draggableNumber2 from "../assets/Number/Medium/draggableNumber2.webp"
import draggableNumber4 from "../assets/Number/Medium/draggablenumber4.webp"
import draggableNumber6 from "../assets/Number/Medium/draggableNumber6.webp"

import droppableFish1 from "../assets/Number/Medium/droppableFish1.webp"
import droppableFish2 from "../assets/Number/Medium/droppableFish2.webp"

import droppedFish1 from "../assets/Number/Medium/droppedFish1.webp"
import droppedFish2 from "../assets/Number/Medium/droppedFish2.webp"

import bg from "../assets/Number/Medium/bg.webp";

import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 

import ReplayNBack from "../components/ReplayNBack";

import backgroundMusic from "../assets/Sounds/background.mp3";

import applause from "../assets/Sounds/applause.wav"
import { useWithSound } from "../components/useWithSound";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
    

import wrongImage from "../assets/Alphabets/Hard/cross.gif" 

function Droppable({ id, placedShape, shape }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    opacity: isOver ? "0.5" : "1",
    zIndex: isOver ? "10" : "1"
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-center h-[160px] w-[160px] gap-10"
    >
      {placedShape ? placedShape : shape}
    </div>
  );
}

 
function Draggable({ id, disabled = false, shape }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(!disabled ? attributes : {})}
      {...(!disabled ? listeners : {})}
    >
      {shape}
    </div>
  );
}
// --- Progression Logic ---
const PROGRESS_KEY = 'numberMediumProgress'; 

const getProgress = () => {
 return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {
level1: false,
 level2: false, 
 };
};

const saveProgress = (newProgress) => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
};


function NumberGameMed1() {
  const [dropped, setDropped] = useState({});
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);
  

  function handleDragEnd(event) {
    if (event.over) {
      const draggedId = event.active.id;
      const droppedId = event.over.id;

      if (draggedId === droppedId) {
        setDropped((prev) => ({
          ...prev,
          [draggedId]: droppedId,
        }));
      }
    }
  }

  const isGameFinished =
    dropped["two"] && dropped["four"];

   const [count, setCount] = useState(0);
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
             saveProgress("level 1");
 
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
    <>
      <div className="flex h-[100vh] w-[100vw] absolute font-[coiny] text-white overflow-hidden">
        <img src={bg} alt="background" className="absolute w-[100vw] h-[100vh]" />
         <div className="absolute top-0 right-0">Your Time: {count}</div>
        <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
          {/* Draggables */}
  
      <div className="absolute xl:h-20 xl:w-100 xl:bottom-5 xl:right-100  xl2:bg-pink-400 xl2:bottom-0 xl2:right-105  xl2:h-25 xl2:w-120 z-1 flex ">
              {!dropped["two"] && (
            <div className="absolute xl:left-5 xl2:left-7">
              <Draggable
                id="two"
                shape={<img src={draggableNumber2} alt="number 2" className="h-[80px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

          {!dropped["four"] && (
            <div className="absolute xl:right-0 xl2:right-7">
              <Draggable
                id="four"
                shape={<img src={draggableNumber4} alt="number 4" className="h-[80px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

          {!dropped["six"] && (
            <div className="absolute xl:right-40 xl2:right-53">
              <Draggable
                id="six"
                shape={<img src={draggableNumber6} alt="number 6" className="h-[80px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}
          </div>
         
          

          {/* Droppables */}
          <div className="flex h-120 w-250 gap-6 absolute xl:top-30 xl:right-40 z-0 xl2:right-45">

            <div className="absolute top-55 left-60 motion-preset-pulse-sm motion-duration-2000 xl2:left-30 xl2:top-65">

              <Droppable
              id="two"
              shape={<img src={droppableFish1} alt="fish image" />}
              placedShape={
                dropped["two"] && (
                  <Draggable
                    id="two"
                    shape={<img src={droppedFish1} alt="fish with number 2" />}
                    disabled={true}
                  />
                )
              }
            />
            </div>

              <div className="absolute left-170 motion-preset-pulse-sm motion-duration-2000 ">
                <Droppable
              id="four"
              shape={<img src={droppableFish2} alt="fish image" />}
              placedShape={
                dropped["four"] && (
                  <Draggable
                    id="four"
                    shape={<img src={droppedFish2} alt="fish with number 4" />}
                    disabled={true}
                  />
                )
              }
            />
              </div>
          </div>
        </DndContext>


 {/*Results*/}
        {isGameFinished && count <= 15 && (
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

{isGameFinished && count <= 20 && count > 25 &&(
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

{isGameFinished && count > 25 &&(
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

export default NumberGameMed1;
