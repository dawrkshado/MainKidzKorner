import { useState,useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";

import draggableNumber1 from "../assets/Number/Medium/number1.webp"
import draggableNumber2 from "../assets/Number/Medium/number2.webp"
import draggableNumber5 from "../assets/Number/Medium/number5.webp"
import draggableNumber8 from "../assets/Number/Medium/number8.webp"
import draggableNumber10 from "../assets/Number/Medium/number10.webp"

import droppableFish1 from "../assets/Number/Medium/mediumfishDroppable.webp"
import droppableFish2 from "../assets/Number/Medium/mediumfishDroppable2.webp"

import droppedFish1 from "../assets/Number/Medium/mediumFishDropDone2.webp"
import droppedFish2 from "../assets/Number/Medium/mediumFishDropDone1.webp"


import ReplayNBack from "../components/ReplayNBack";

import bg from "../assets/Number/Medium/bg2.webp";

import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 

import backgroundMusic from "../assets/Sounds/background.mp3";

import applause from "../assets/Sounds/applause.wav"
import { useWithSound } from "../components/useWithSound";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
    

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

function NumberGameMed2() {
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
      dropped["eight"] && dropped["ten"];
  
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
                 saveProgress("level 2");
     
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
      <div className="flex h-[100vh] w-[100vw] absolute overflow-hidden font-[coiny] ">
        
        <img src={bg} alt="background" className="absolute w-[100vw] h-[100vh]" />
        <div className="absolute top-0 right-0">Your Time: {count}</div>
        <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
          {/* Draggables */}

          <div >
              {!dropped["one"] && (
            <div className="absolute xl:top-10 xl:left-[350px] xl2:left-100">
              <Draggable
                id="one"
                shape={<img src={draggableNumber1} alt="number 1" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

          {!dropped["two"] && (
            <div className="absolute xl:top-10 xl:left-[530px] xl2:left-150">
              <Draggable
                id="two"
                shape={<img src={draggableNumber2} alt="number 4" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

          {!dropped["five"] && (
            <div className="absolute xl:top-12 xl:left-[720px] xl2:left-200">
              <Draggable
                id="five"
                shape={<img src={draggableNumber5} alt="number 5" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

           {!dropped["eight"] && (
            <div className="absolute xl:top-10 xl:right-[435px] xl2:left-250">
              <Draggable
                id="eight"
                shape={<img src={draggableNumber8} alt="number 8" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

          {!dropped["ten"] && (
            <div className="absolute xl:top-10 xl:right-[230px] xl2:left-295">
              <Draggable
                id="ten"
                shape={<img src={draggableNumber10} alt="number 4" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}
          </div>
        

          {/* Droppables */}
          <div className="flex xl:h-120 xl:w-250  gap-6 absolute xl:top-33 xl:right-0 z-0">


            <div className="absolute xl:top-35 xl2:top-45 xl:left-65 xl2:left-75 motion-preset-pulse-sm motion-duration-2000">
              <Droppable
              id="eight"
              shape={<img src={droppableFish2} alt="fish image" />}
              placedShape={
                dropped["eight"] && (
                  <Draggable
                    id="eight"
                    shape={<img src={droppedFish1} alt="fish with number 2" />}
                    disabled={true}
                  />
                )
              }
            />
            </div>
            
              <div className="absolute xl:right-15 xl2:left-215 xl:top-35 xl2:top-45 motion-preset-pulse-sm motion-duration-2000">
                <Droppable
              id="ten"
              shape={<img src={droppableFish1} alt="fish image" />}
              placedShape={
                dropped["ten"] && (
                  <Draggable
                    id="ten"
                    shape={<img src={droppedFish2} alt="fish with number 4" />}
                    disabled={true}
                  />
                )
              }
            />
              </div>
          </div>

          
 {/*Results*/}
{isGameFinished && count <= 15 &&(
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

{isGameFinished &&  count > 20 && count <= 25 &&(
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
        </DndContext>
      </div>

    </>
  );
}

export default NumberGameMed2;
