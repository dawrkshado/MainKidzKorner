import bg from "../assets/Shapes/ShapesMedium/level1/bg.webp";
import { useState,useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";


import circleDroppable from "../assets/Shapes/ShapesMedium/level1/droppableCircle.webp";
import circleDraggable from "../assets/Shapes/ShapesMedium/level1/circleDraggable.webp";
import squareDraggable from "../assets/Shapes/ShapesMedium/level1/draggableSquare.webp";
import squareDroppable from "../assets/Shapes/ShapesMedium/level1/droppableSquare.webp";
import triangleDraggable from "../assets/Shapes/ShapesMedium/level1/draggableTriangle.webp";
import triangleDroppable from "../assets/Shapes/ShapesMedium/level1/droppableTriangle.webp";

import api from "../api.js";

import ReplayNBack from "../components/ReplayNBack.jsx";

import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 

import Bone from "../assets/Shapes/ShapesMedium/level1/bone.webp"

import backgroundMusic from "../assets/Sounds/background.mp3";

import applause from "../assets/Sounds/applause.wav"
import { useWithSound } from "../components/useWithSound";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";



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
      className={`flex items-center justify-center h-[200px] w-[300px] gap-10 `}
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
  const progress = JSON.parse(localStorage.getItem("shapesMediumProgress")) || {
    level1: false,
    level2: false,
  };
  progress[level] = true;
  localStorage.setItem("shapesMediumProgress", JSON.stringify(progress));
}


function ShapesMediumLevel1() {
    const [dropped, setDropped] = useState({});
    const [count, setCount] = useState(0);

   
    const navigate = useNavigate();
    
    const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);
   
    const isGameFinished =
        dropped["circle"] && dropped["square"] && dropped["triangle"];


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

    const isPlaced = (id) => dropped[id] === id; 
    
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

    const handleBackgroundClick = () => {};
    const handleBoardClick = () => {};


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

  return (
    <>
     
      <div className="flex h-[100vh] w-[100vw] [&>*]:flex absolute [&>*]:font-[coiny] overflow-hidden bg-no-repeat bg-cover bg-bottom" style={{backgroundImage:`url(${bg})`}}>
     
         <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
            <>
          <img src={Bone} alt="image of a bone for design" className="absolute h-15 bottom-50 z-10 left-20" />
              {/* Draggables */}
              <div className="absolute gap-6 w-[460px] justify-center z-10 top-55 xl:right-10 xl2:right-130 p-4 rounded-lg">
                {!dropped["circle"] && (
                  <Draggable
                    id="circle"
                    shape={
                      <img
                        src={circleDraggable}
                        alt="circle shape"
                        className="h-[110px]"
                      />
                    }
                  />
                )}

                {!dropped["square"] && (
                  <Draggable
                    id="square"
                    shape={
                      <img
                        src={squareDraggable}
                        alt="square shape"
                        className="h-[110px]"
                      />
                    }
                  />
                )}

                {!dropped["triangle"] && (
                  <Draggable
                    id="triangle"
                    shape={
                      <img
                        src={triangleDraggable}
                        alt="triangle shape"
                        className="h-[110px]"
                      />
                    }
                  />
                )}
              </div>

              {/* Droppables */}
                <div className="absolute xl:bottom-125  xl:right-28 ">
                  <Droppable
                  id="circle"
                  shape={<img src={circleDroppable} alt="transparent circle" className="xl:h-33"/>}
                  placedShape={
                    dropped["circle"] && (
                      <Draggable
                        id="circle"
                        shape={<img src={circleDraggable} alt="circle shape" className="xl:h-35"/>}
                        disabled={true}
                      />
                    )
                  }
                />
                </div>

                <div className="absolute xl:bottom-0 xl:left-7  h-60 w-60 ">
                  <Droppable
                  id="square"
                  shape={<img src={squareDroppable} alt="transparent square" className="h-60 w-200" />}
                  placedShape={
                    dropped["square"] && (
                      <Draggable
                        id="square"
                        shape={<img src={squareDraggable} alt="square shape" />}
                        disabled={true}
                      />
                    )
                  }
                />
                </div>

                <div className="absolute xl:bottom-72 ">
                   <Droppable
                  id="triangle"
                  shape={<img src={triangleDroppable} alt="transparent triangle" />}
                  placedShape={
                    dropped["triangle"] && (
                      <Draggable
                        id="triangle"
                        shape={<img src={triangleDraggable} alt="triangle shape" />}
                        disabled={true}
                      />
                    )
                  }
                />
                </div>
               
      
                <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>
                
            </>     
                 
 
               
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
export default ShapesMediumLevel1;
