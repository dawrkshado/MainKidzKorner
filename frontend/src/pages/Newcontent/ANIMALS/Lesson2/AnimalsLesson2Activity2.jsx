import { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";

import BG from "../../../../assets/Animals/Lesson2/bg.webp"
import Bird from "../../../../assets/Animals/Lesson1/Bird.webp"
import Horse from "../../../../assets/Animals/Lesson1/Horse.webp"
import Snake from "../../../../assets/Animals/Lesson1/Snake.webp"
import Bunny from "../../../../assets/Animals/Lesson1/Bunny.webp"
import Fish from "../../../../assets/Animals/Lesson1/fish.webp"

import WaterDroppable from "../../../../assets/Animals/Lesson2/WaterDroppable.webp"
import ForestDroppable from "../../../../assets/Animals/Lesson2/ForestDroppable.webp"
import AirDroppable from "../../../../assets/Animals/Lesson2/AirDroppable.webp"

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
      className={`flex items-center justify-center h-[100%] w-[100%]`}
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

function AnimalsLesson2Activity2() {
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause); 
  const [dropped, setDropped] = useState({});

  // 🧩 NEW: Define your animals with unique IDs and types
  const animals = [
    { id: "bird1", type: "air", img: Bird },
    { id: "bunny1", type: "land", img: Bunny },
    { id: "snake1", type: "land", img: Snake },
    { id: "horse1", type: "land", img: Horse },
    { id: "fish1", type: "water", img: Fish },
  ];

  function handleDragEnd(event) {
    if (event.over) {
      const draggedId = event.active.id;
      const droppedId = event.over.id;

      // Find the dragged animal by ID
      const draggedAnimal = animals.find(a => a.id === draggedId);
      if (!draggedAnimal) return;

      // ✅ If the animal's type matches the droppable ID, accept the drop
      if (draggedAnimal.type === droppedId) {
        setDropped(prev => ({
          ...prev,
          [draggedId]: droppedId,
        }));
      }
    }
  }

  // Check if all animals are placed correctly
  const isGameFinished = animals.every(a => dropped[a.id]);

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
                     
const isPlaced= (id) => dropped[id];

  return (
    <>
      <div className="flex h-[100vh] w-[100vw] [&>*]:flex absolute font-[coiny] overflow-hidden bg-cover bg-no-repeat" style={{backgroundImage:`url(${BG})`}} >
        <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>
                
        <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
         
          {/* 🐾 Draggables */}
          <div className="flex absolute gap-30 mt-10 w-[100vw] h-[300px] justify-center z-10 top-100 lg:top-[10%] p-4 rounded-lg">
            {animals.map(animal => (
              !dropped[animal.id] && (
                <Draggable
                  key={animal.id}
                  id={animal.id}
                  shape={
                      <img
                        src={animal.img}
                        alt={animal.id}
                        className="h-[130px] w-auto object-contain"
                      />
                  }
                />
              )
            ))}
          </div>

          {/* 🌍 Droppables */}
          <div className="flex h-[50%] w-[100vw] justify-around absolute lg:bottom-0 ">
            <Droppable
              id="water"
              shape={<img src={WaterDroppable} alt="Where you will drop the smaller letter" className="h-[100%]" />}
            />
            <Droppable
              id="land"
              shape={<img src={ForestDroppable} alt="Where you will drop the smaller letter" className="h-[100%]" />}
            />
            <Droppable
              id="air"
              shape={<img src={AirDroppable} alt="Where you will drop the smaller letter" className="h-[100%]" />}
            />
          </div>

          {/* ⭐ Results */}
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
              <div className="absolute bottom-[20%] ">
                <ReplayNBack/>
              </div>
            </div>
          )}

          {isGameFinished && count <= 20 && count > 15 && (
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

          {isGameFinished && count > 20 && (
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

export default AnimalsLesson2Activity2;
