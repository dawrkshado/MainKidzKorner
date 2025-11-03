import React, { useState,useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";

import heptagonDroppable from "../assets/Shapes/ShapesEasy/heptagonDroppable.webp"
import heptagonDraggable from "../assets/Shapes/ShapesEasy/heptagonDraggable.webp"
import diamondDraggable from "../assets/Shapes/ShapesEasy/diamondDraggable.webp"
import diamondDropppable from "../assets/Shapes/ShapesEasy/diamondDropppable.webp"
import pentagonDroppable from  "../assets/Shapes/ShapesEasy/diamondDroppable.webp"
import pentagonDraggable from "../assets/Shapes/ShapesEasy/pentagonDraggable.webp"
import bg from "../assets/Shapes/ShapesEasy/lvl3Bg.webp"

import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 


import ReplayNBack from "../components/ReplayNBack";

import backgroundMusic from "../assets/Sounds/background.mp3";

import { motion } from "framer-motion";

import applause from "../assets/Sounds/applause.wav"
import { useWithSound } from "../components/useWithSound";
import { useNavigate } from "react-router-dom";


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
      className={`flex items-center justify-center h-[160px] w-[160px] ml-5`}
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

function ShapesEasyLevel3() {
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause); 

  const [dropped, setDropped] = useState({});
  const [count, setCount] = useState(0);


  const isGameFinished = 
    dropped["heptagon"] === "heptagon" && 
    dropped["diamond"] === "diamond" && 
    dropped["pentagon"] === "pentagon";

  
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

       saveProgress("level3")

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
    <div className="flex h-[100vh] w-[100vw]  [&>*]:flex absolute overflow-hidden [&>*]:font-[coiny] ">
      <img src={bg} alt="background" className="absolute w-[100vw]"/>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>


      <div className="h-[110px] w-[360px] justify-center z-1 absolute top-100 right-135 [&>*]:mx-5 [&>*]:font-[coiny]">             
        {!dropped ["heptagon"] && (
          <Draggable
            id = "heptagon"
            shape={<img src={heptagonDraggable} alt="a heptagon shape" className=" hover:cursor-grab h-[70px]"/>}
          />
        )}

        {!dropped ["diamond"] && (
          <Draggable
            id = "diamond"
            shape={<img src={diamondDraggable} alt="diamond shape in green" className="h-[70px]"/>}
          />
        )}

        {!dropped ["pentagon"] && (
          <Draggable
            id = "pentagon"
            shape={<img src={pentagonDraggable} alt="image of shape of a heart" className=" h-[70px] hover:cursor-grab"/>}
          />
        )}
      </div >


      {/*Droppable*/}
      <div className="absolute top-50 right-120 ">
        <Droppable
          id = "heptagon"
          shape={<img src={heptagonDroppable} alt="transparent heptagon"/>}
          placedShape={
          dropped["heptagon"] && (<Draggable
          id="heptagon"
          shape = {<img src={heptagonDraggable} alt="star shape that is transparent"/>}
        disabled={true}/>)}
        />


        <Droppable
          id = "diamond"
          shape={<img src={diamondDropppable} alt="transparent oval shape" className=""/>}
          placedShape={
          dropped["diamond"] && (<Draggable
          id="diamond"
          shape = {<img src={diamondDraggable} alt="oval shape in green"/>}
          disabled={true}/>)}
        />


        <Droppable
          id = "pentagon"
          shape={<img src={pentagonDroppable} alt="image of a transparent heart"/>}
          placedShape={
          dropped["pentagon"] && (<Draggable
          id="pentagon"
          shape = {<img src={pentagonDraggable} alt="image of a transparent heart"/>}
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

export default ShapesEasyLevel3;
