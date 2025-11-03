import { useState,useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";

import Mdraggable from "../assets/Alphabets/Medium/draggableM.webp";
import Ndraggable from "../assets/Alphabets/Medium/draggableN.webp";
import Odraggable from "../assets/Alphabets/Medium/draggableO.webp";
import Pdraggable from "../assets/Alphabets/Medium/draggableP.webp";
import Qdraggable from "../assets/Alphabets/Medium/draggableQ.webp";
import droppableImage from "../assets/Alphabets/Medium/droppables.webp";
import bg from "../assets/Alphabets/Medium/bg1.webp";


import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 

import ReplayNBack from "../components/ReplayNBack";
import backgroundMusic from "../assets/Sounds/background.mp3";

import { motion } from "framer-motion";

import applause from "../assets/Sounds/applause.wav"
import { useWithSound } from "../components/useWithSound";
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
      className={`flex items-center justify-center h-[120px] w-[120px]`}
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
function AlphabetMedium1() {
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
    dropped["m"] && dropped["n"] && dropped["o"] && dropped["p"] && dropped["q"];

   const [count, setCount] = useState(0);

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
                       
                      
function handleDragEnd(event) {
if (event.over && event.active.id === event.over.id) { 
const draggedId = event.active.id;
const droppedId = event.over.id;
                     
((prev) => ({
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
    <>
      <div className="flex h-[100vh] w-[100vw] [&>*]:flex absolute font-[coiny] overflow-hidden">
        <img src={bg} alt="background" className="absolute w-[100vw]" />
    <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>
                
         <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
         
         
      
              {/* Draggables */}
              <div className="flex absolute  gap-30 mt-10 w-[100vw] h-[300px] justify-center z-10 top-100 lg:top-115 p-4 rounded-lg ">
            

                {!dropped["n"] && (
                  <Draggable
                    id="n"
                    shape={
                      <img
                        src={Ndraggable}
                        alt="letter N"
                        className="h-[80px]"
                      />
                    }
                  />
                )}

                {!dropped["o"] && (
                  <Draggable
                    id="o"
                    shape={
                      <img
                        src={Odraggable}
                        alt="letter O"
                        className="h-[80px]"
                      />
                    }
                  />
                )}

                    {!dropped["m"] && (
                  <Draggable
                    id="m"
                    shape={
                      <img
                        src={Mdraggable}
                        alt="letter M"
                        className="h-[80px]"
                      />
                    }
                  />
                )}

                 

                {!dropped["q"] && (
                  <Draggable
                    id="q"
                    shape={
                      <img
                        src={Qdraggable}
                        alt="letter q"
                        className="h-[80px]"
                      />
                    }
                  />
                )}

                {!dropped["p"] && (
                  <Draggable
                    id="p"
                    shape={
                      <img
                        src={Pdraggable}
                        alt="letter p"
                        className="h-[80px]"
                      />
                    }
                  />
                )}
              </div>
              

              {/* Droppables */}
              <div className="flex justify-center gap-30 absolute top-70 left-40 lg:top-85 lg:left-58">
                <Droppable
                  id="m"
                  shape={<img src={droppableImage} alt="Where you will drop the smaller letter" />}
                  placedShape={
                    dropped["m"] && (
                      <Draggable
                        id="m"
                        shape={<img src={Mdraggable} alt="letter m" className="h-20" />}
                        disabled={true}
                      />
                    )
                  }
                />

                <Droppable
                  id="n"
                  shape={<img src={droppableImage} alt="Where you will drop the smaller letter" />}
                  placedShape={
                    dropped["n"] && (
                      <Draggable
                        id="n"
                        shape={<img src={Ndraggable} alt="letter n"  className="h-20"/>}
                        disabled={true}
                      />
                    )
                  }
                />
                <Droppable
                  id="o"
                  shape={<img src={droppableImage} alt="Where you will drop the smaller letter" />}
                  placedShape={
                    dropped["o"] && (
                      <Draggable
                        id="o"
                        shape={<img src={Odraggable} alt="Letter O" className="h-20" />}
                        disabled={true}
                      />
                    )
                  }
                />

                <Droppable
                  id="p"
                  shape={<img src={droppableImage} alt="Where you will drop the smaller letter" />}
                  placedShape={
                    dropped["p"] && (
                      <Draggable
                        id="p"
                        shape={<img src={Pdraggable} alt="Letter P" className="h-20"/>}
                        disabled={true}
                      />
                    )
                  }
                />
                <Droppable
                  id="q"
                  shape={<img src={droppableImage} alt="Where you will drop the smaller letter" />}
                  placedShape={
                    dropped["q"] && (
                      <Draggable
                        id="q"
                        shape={<img src={Qdraggable} alt="Small Letter Q" className="h-20" />}
                        disabled={true}
                      />
                    )
                  }
                />
                
                
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

export default AlphabetMedium1;

