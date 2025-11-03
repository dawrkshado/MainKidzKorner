import { useState,useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";

import BG from "../../../../assets/Animals/Lesson3/bg1.webp"
import Calf from "../../../../assets/Animals/Lesson3/Calf.webp"
import Chick from "../../../../assets/Animals/Lesson3/Chick.webp"
import Kitten from "../../../../assets/Animals/Lesson3/Kitten.webp"
import Lamb from "../../../../assets/Animals/Lesson3/Lamb.webp"
import Puppy from "../../../../assets/Animals/Lesson3/Puppy.webp"


import Sheep from "../../../../assets/Animals/Lesson3/Sheep.webp"
import SheepDone from "../../../../assets/Animals/Lesson3/SheepDone.webp"
import Cat from "../../../../assets/Animals/Lesson3/Cat.webp"
import CatDone from "../../../../assets/Animals/Lesson3/CatDone.webp"
import Cow from "../../../../assets/Animals/Lesson3/Cow.webp"
import CowDone from "../../../../assets/Animals/Lesson3/CowDone.webp"
import Dog from "../../../../assets/Animals/Lesson3/Dog.webp"
import DogDone from "../../../../assets/Animals/Lesson3/DogDone.webp"
import Chicken from "../../../../assets/Animals/Lesson3/Chicken.webp"
import ChickenDone from "../../../../assets/Animals/Lesson3/ChickenDone.webp"

import OneStar from "../../../../assets/Done/OneStar.webp"; 
import TwoStar from "../../../../assets/Done/TwoStar.webp"; 
import ThreeStar from "../../../../assets/Done/ThreeStar.webp"; 

import ReplayNBack from "../../../../components/ReplayNBack";
import backgroundMusic from "../../../../assets/Sounds/background.mp3";

import { motion } from "framer-motion";

import applause from "../../../../assets/Sounds/applause.wav"
import { useWithSound } from "../../../../components/useWithSound";
import { useNavigate } from "react-router-dom";

function Droppable({ id, placedShape, shape }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    opacity: isOver ? "0.5" : "1",
    zIndex: isOver ? "10" : "1",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-center h-100 w-100`}
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

const PROGRESS_KEY = 'alphabetMediumProgress'; 

function saveProgress(level) {
  const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {
    level1: false,
    level2: false,
  };
  progress[level] = true;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}
function AnimalsLessonActivity1() {
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause); 
  const [dropped, setDropped] = useState({});

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
    dropped["dog"] && dropped["sheep"] && dropped["cat"] && dropped["chicken"] && dropped["cow"];

   const [count, setCount] = useState(1);
                         
                       
                     
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
playApplause(); 
saveProgress("level1");
                     
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
    <>
      <div className="flex h-[100vh] w-[100vw] [&>*]:flex absolute font-[coiny] overflow-hidden bg-cover bg-no-repeat" style={{backgroundImage:`url(${BG})`}} >
    <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>
                
         <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
         
      

              {/* Droppables */}
              <div className="absolute top-60 items-center justify-center w-[100vw] h-[40vw] ">
                <Droppable
                          id="cat"
                          shape={<img src={Cat} alt="Where you will drop the Puppy sound" className="w-[60%] h-[60%] object-contain" />}
                          placedShape={
                            dropped["cat"] && (
                              <Draggable
                                id="cat"
                                shape={<img src={CatDone} alt="letter n" className="h-[30%]" />}
                                disabled={true}
                              />
                            )
                          }
                        />
                <Droppable
                  id="sheep"
                
                  shape={<img src={Sheep} alt="Where you will drop the smaller letter"   className="w-[60%] h-[60%] object-contain"/>}
                  placedShape={
                    dropped["sheep"] && (
                      <Draggable
                        id="sheep"
                        shape={<img src={SheepDone} alt="letter n"  className="h-[30%]"/>}
                        disabled={true}
                      />
                    )
                  }
                />
                <Droppable
                  id="cow"
                  shape={<img src={Cow} alt="Where you will drop the smaller letter"   className="w-[60%] h-[60%] object-contain"/>}
                  placedShape={
                    dropped["cow"] && (
                      <Draggable
                        id="cow"
                        shape={<img src={CowDone} alt="Letter O" className="h-[30%] " />}
                        disabled={true}
                      />
                    )
                  }
                />

                <Droppable
                  id="chicken"
                  shape={<img src={Chicken} alt="Where you will drop the smaller letter"   className="w-[60%] h-[60%] object-contain"/>}
                  placedShape={
                    dropped["chicken"] && (
                      <Draggable
                        id="chicken"
                        shape={<img src={ChickenDone} alt="Letter P" className="h-[30%]"/>}
                        disabled={true}
                      />
                    )
                  }
                />
                <Droppable
                  id="dog"
                  shape={<img src={Dog} alt="Where you will drop the smaller letter"   className="w-[60%] h-[60%] object-contain"/>}
                  placedShape={
                    dropped["dog"] && (
                      <Draggable
                        id="dog"
                        shape={<img src={DogDone} alt="Small Letter Q" className="h-[30%]" />}
                        disabled={true}
                      />
                    )
                  }
                />
                
                
              </div>


               {/* Draggables */}
              <div className="flex absolute  gap-30 mt-10 w-[100vw] h-[300px] justify-center z-10 top-70 lg:top-40 p-4 rounded-lg ">

                {!dropped["cow"] && (
                  <Draggable
                    id="cow"
                    shape={
                      <img
                        src={Calf}
                        alt="cow"
                        className="h-[40%]"
                      />
                    }
                  />
                )}

                {!dropped["sheep"] && (
                  <Draggable
                    id="sheep"
                    shape={
                      <img
                        src={Lamb}
                        alt="sheep"
                         className="h-[40%]"
                      />
                    }
                  />
                )}

                    {!dropped["cat"] && (
                  <Draggable
                    id="cat"
                    shape={
                      <img
                        src={Kitten}
                        alt="cat"
                         className="h-[40%]"
                      />
                    }
                  />
                )}
                 

                {!dropped["chicken"] && (
                  <Draggable
                    id="chicken"
                    shape={
                      <img
                        src={Chick}
                        alt="Chick bubble"
                         className="h-[40%]"
                      />
                    }
                  />
                )}
                 {!dropped["dog"] && (
                  <Draggable
                    id="dog"
                    shape={
                      <img
                        src={Puppy}
                        alt="dog"
                        className="h-[40%]"
                      />
                    }
                  />
                )}
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

{isGameFinished && count <= 20 && count > 15 &&(
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

{isGameFinished && count > 20 &&(
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

export default AnimalsLessonActivity1;
