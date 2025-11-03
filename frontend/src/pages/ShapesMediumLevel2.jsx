import bg from "../assets/Shapes/ShapesMedium/level2/bg.webp";
import { useState,useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";

import oblongDroppable from "../assets/Shapes/ShapesMedium/level2/oblongDroppable.webp";
import oblongDraggable from "../assets/Shapes/ShapesMedium/level2/oblongDraggable.webp";
import oblongDropped  from "../assets/Shapes/ShapesMedium/level2/oblongDropped.webp"

import rectangleDroppable from "../assets/Shapes/ShapesMedium/level2/rectangleDroppable.webp";
import rectangleDraggable from "../assets/Shapes/ShapesMedium/level2/rectangleDraggable.webp";

import starDroppable from "../assets/Shapes/ShapesMedium/level2/starDroppable.webp";
import starDraggable from "../assets/Shapes/ShapesMedium/level2/starDraggable.webp";
import starDropped from "../assets/Shapes/ShapesMedium/level2/starDropped.webp"

import ReplayNBack from "../components/ReplayNBack.jsx";

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
    zIndex: isOver ? "10" : "1",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-center h-[300px] w-[300px] gap-10 `}
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

function ShapesMediumLevel2() {
    const [dropped, setDropped] = useState({});
    const [count, setCount] = useState(0);

   
    const navigate = useNavigate();
    
    const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);
   
    const isGameFinished =
        dropped["oblong"] && dropped["rectangle"] && dropped["star"];


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
    <>
      <div className="flex h-[100vh] w-[100vw] [&>*]:flex absolute [&>*]:font-[coiny] overflow-hidden bg-no-repeat bg-cover bg-center" style={{backgroundImage:`url(${bg})`}}>
        <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
          <>
            {/* Draggables */}
            <div className="absolute flex gap-6 w-[500px] z-10 bottom-45 right-10 xl2:right-130 rounded-lg ">
              
              <div className="h-[110px] w-[300px]  flex items-center justify-center">
                {!dropped["oblong"] ? (
                  <Draggable
                    id="oblong"
                    shape={
                      <img
                        src={oblongDraggable}
                        alt="oblong shape"
                        className="h-[110px] w-[200px]"
                      />
                    }
                  />
                ) : (
                  <div className="h-[110px] w-[200px] invisible" />
                )}
              </div>


              <div className="h-[110px] w-[300px] flex items-center justify-center">
                {!dropped["rectangle"] ? (
                  <Draggable
                    id="rectangle"
                    shape={
                      <img
                        src={rectangleDraggable}
                        alt="rectangle shape"
                        className="h-[110px] w-[200px]"
                      />
                    }
                  />
                ) : (
                  <div className="h-[110px] w-[150px] invisible" />
                )}
              </div>

          <div className="h-[110px] w-[200px] flex items-center justify-center">
                {!dropped["star"] ? (
                  <Draggable
                    id="star"
                    shape={
                      <img
                        src={starDraggable}
                        alt="star shape"
                        className="h-[110px] w-[170px]"
                      />
                    }
                  />
                ) : (
                  <div className="h-[110px] w-[170px] invisible" />
                )}
              </div>
            </div>

            {/* Droppables */}
            <div className="absolute top-15 h-fit  left-107 ">
              <Droppable
                id="oblong"
                shape={<img src={oblongDroppable} alt="transparent oblong" className="h-70 w-55"/>}
                placedShape={
                  dropped["oblong"] && (
                    <Draggable
                      id="oblong"
                      shape={<img src={oblongDropped} alt="oblong shape" className="h-70 w-55"/>}
                      disabled={true}
                    />
                  )
                }
              />
            </div>

            <div className="absolute h-70 w-69 left-125 bottom-18">
              <Droppable
                id="rectangle"
                shape={<img src={rectangleDroppable} alt="transparent rectangle" className="h-28 w-70" />}
                placedShape={
                  dropped["rectangle"] && (
                    <Draggable
                      id="rectangle"
                      shape={<img src={rectangleDraggable} alt="rectangle shape" className="h-28 w-70"/>}
                      disabled={true}
                    />
                  )
                }
              />
            </div>

            <div className="absolute top-0 left-35">
              <Droppable
                id="star"
                shape={<img src={starDroppable} alt="transparent star" className="h-25" />}
                placedShape={
                  dropped["star"] && (
                    <Draggable
                      id="star"
                      shape={<img src={starDropped} alt="star shape" className="h-25" />}
                      disabled={true}
                    />
                  )
                }
              />
            </div>

            <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>
          </>

 {/*Results*/}
                
        {/* 1. 3 Stars: Time is 10 seconds or less */}
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

        {/* 2. 2 Stars: Time is between 11 and 15 seconds */}
        {isGameFinished && count > 10 && count <= 15 && (
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

        {/* 3. 1 Star: Time is between 16 and 25 seconds */}
        {isGameFinished && count > 15 && count <= 25 && (
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
        
        {/* 4. Catch-all: Time is greater than 25 seconds */}
        {isGameFinished && count > 25 && (
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

export default ShapesMediumLevel2;