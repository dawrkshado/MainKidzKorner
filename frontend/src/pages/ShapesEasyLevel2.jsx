import React, { useState, useEffect} from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";

import heartDroppable from "../assets/Shapes/ShapesEasy/heartDroppable.webp"
import heartDraggable from "../assets/Shapes/ShapesEasy/heartDraggable.webp"
import starDraggable from "../assets/Shapes/ShapesEasy/starDraggable.webp"
import starDroppable from "../assets/Shapes/ShapesEasy/starDroppable.webp"
import ovalDroppable from  "../assets/Shapes/ShapesEasy/ovalDroppable.webp"
import ovalDraggable from "../assets/Shapes/ShapesEasy/ovalDraggable.webp"
import bg from "../assets/Shapes/ShapesEasy/lvl2.webp"


import ReplayNBack from "../components/ReplayNBack";

import backgroundMusic from "../assets/Sounds/background.mp3";

import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 

import applause from "../assets/Sounds/applause.wav"
import { useWithSound } from "../components/useWithSound";
import { useNavigate } from "react-router-dom";


import { motion } from "framer-motion";


function Droppable({id, placedShape,shape}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    opacity: isOver ? "0.5":"1",
    zIndex: isOver? "10":"1"
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-center h-[160px] w-[160px] ml-10`}
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

function saveProgress(level) {
  const progress = JSON.parse(localStorage.getItem("shapesEasyProgress")) || {
    level1: false,
    level2: false,
    level3: false,
  };
  progress[level] = true;
  localStorage.setItem("shapesEasyProgress", JSON.stringify(progress));
}


function ShapesEasyLevel2() {
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause); 

  const [dropped, setDropped] = useState({});
  const [count, setCount] = useState(0);


  const isGameFinished = 
    dropped["star"] === "star" && 
    dropped["oval"] === "oval" && 
    dropped["heart"] === "heart";

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

       saveProgress("level2")

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
    <div className="flex h-[100vh] w-[100vw]  [&>*]:flex absolute overflow-hidden [&>*]:font-[coiny]">
      <img src={bg} alt="background" className="absolute w-[100vw]"/>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>

{/*Draggables*/}
    <div className="h-[110px] w-[360px] justify-center z-1 absolute bottom-40 [&>*]:ml-5  lg:left-10">             
 {!dropped ["star"] && (
          <Draggable
              id = "star"
              shape={<img src={starDraggable} alt="a star shape" className=" hover:cursor-grab h-[70px]"/>}
          />
        )}
       

         {!dropped ["oval"] && (
          <Draggable
              id = "oval"
              shape={<img src={ovalDraggable} alt="oval shape in green" className="h-[70px] hover:cursor-grab"/>}
          />
        )}

        {!dropped ["heart"] && (
          <Draggable
              id = "heart"
              shape={<img src={heartDraggable} alt="image of shape of a heart" className=" h-[70px] hover:cursor-grab"/>}
          />
        )}
    </div >
        
       
{/*Droppable*/}
<div className="absolute left-90 top-50 lg:left-110">
    <Droppable
        id = "star"
        shape={<img src={starDroppable}/>}
        placedShape={
          dropped["star"] && (<Draggable
          id="star"
          shape = {<img src={starDraggable} alt="star shape that is transparent"/>}
          disabled={true}/>)}/>


           <Droppable
        id = "oval"
        shape={<img src={ovalDroppable} alt="transparent oval shape" className=""/>}
        placedShape={
          dropped["oval"] && (<Draggable
          id="oval"
          shape = {<img src={ovalDraggable} alt="oval shape in green"/>}
          disabled={true}/>)}
        />


         <Droppable
        id = "heart"
        shape={<img src={heartDroppable} alt="image of a transparent heart"/>}
        placedShape={
          dropped["heart"] && (<Draggable
          id="heart"
          shape = {<img src={heartDraggable} alt="image of a transparent heart"/>}
          disabled={true}/>)}
        /> 
        </div>

   <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>
      
                  
         
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

    {isGameFinished && count <= 15 && count > 10 && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
             
            <motion.img
              src={TwoStar}
              alt="Game Completed!"
              className="h-[300px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
             <div className="absolute bottom-[20%]">
              <ReplayNBack /></div>
          </div>
        )}

{isGameFinished && count > 15 && (
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
  );
}

export default ShapesEasyLevel2;
