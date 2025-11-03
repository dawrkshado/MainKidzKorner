import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";

import BG from "../../../../assets/Animals/Lesson2/bg.webp";
import Bird from "../../../../assets/Animals/Lesson1/Bird.webp";
import Horse from "../../../../assets/Animals/Lesson1/Horse.webp";
import Snake from "../../../../assets/Animals/Lesson1/Snake.webp";
import Bunny from "../../../../assets/Animals/Lesson1/Bunny.webp";
import Fish from "../../../../assets/Animals/Lesson1/Fish.webp";

import WaterDroppable from "../../../../assets/Animals/Lesson2/WaterDroppable.webp";
import ForestDroppable from "../../../../assets/Animals/Lesson2/ForestDroppable.webp";
import AirDroppable from "../../../../assets/Animals/Lesson2/AirDroppable.webp";

import OneStar from "../../../../assets/Done/OneStar.webp";
import TwoStar from "../../../../assets/Done/TwoStar.webp";
import ThreeStar from "../../../../assets/Done/ThreeStar.webp";

import ReplayNBack from "../../../../components/ReplayNBack";
import backgroundMusic from "../../../../assets/Sounds/background.mp3";

import { motion, AnimatePresence } from "framer-motion";
import MoveTutorial2 from "../../../../assets/videos/MoveTutorial2.mp4"; // ← your tutorial video path

import applause from "../../../../assets/Sounds/applause.wav";
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
      className="flex items-center justify-center h-[100%] w-[100%]"
    >
      {placedShape ? placedShape : shape}
    </div>
  );
}

function Draggable({ id, disabled = false, shape }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, disabled });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
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

const PROGRESS_KEY = "alphabetMediumProgress";

function saveProgress(level) {
  const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || { level1: false, level2: false };
  progress[level] = true;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function AnimalsLesson2Activity2() {
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);
  const [dropped, setDropped] = useState({});

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
      const draggedAnimal = animals.find(a => a.id === draggedId);
      if (!draggedAnimal) return;
      if (draggedAnimal.type === droppedId) {
        setDropped(prev => ({ ...prev, [draggedId]: droppedId }));
      }
    }
  }

  const isGameFinished = animals.every(a => dropped[a.id]);

  const [count, setCount] = useState(0);

  // — Tutorial pop-up logic
  const [showTutorial, setShowTutorial] = useState(true);
  const handleVideoEnd = () => setShowTutorial(false);
  const handleSkip = () => setShowTutorial(false);

  // Background music
  useEffect(() => {
    if (showTutorial) return; // don’t play music until tutorial done
    const bgSound = new Audio(backgroundMusic);
    bgSound.loop = true;
    bgSound.volume = 0.3;
    bgSound.play().catch(err => console.log("Autoplay blocked:", err));
    return () => { bgSound.pause(); bgSound.currentTime = 0; };
  }, [showTutorial]);

  // Timer
  useEffect(() => {
    if (isGameFinished) return;
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameFinished]);

  // Finish logic
  useEffect(() => {
    let soundTimeout;
    if (isGameFinished) {
      playApplause();
      saveProgress("level1");
      soundTimeout = setTimeout(() => stopApplause(), 8000);
    }
    return () => { clearTimeout(soundTimeout); stopApplause(); };
  }, [isGameFinished, playApplause, stopApplause]);

  const resetGame = () => { setDropped({}); setCount(0); setShowTutorial(true); };
  const handleReplay = () => { stopApplause(); resetGame(); };
  const handleBack = () => { stopApplause(); navigate("/shapes"); };

  return (
    <>
      {/* Tutorial Pop-up Video */}
      <AnimatePresence mode="wait">
        {showTutorial && (
          <motion.div
            key="tutorial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-black/80 flex justify-center items-center z-50"
          >
            <div className="relative w-[80%] md:w-[60%]">
              <video
                src={MoveTutorial2}
                autoPlay
                onEnded={handleVideoEnd}
                playsInline
                className="rounded-2xl shadow-lg w-full border-4 border-gray-200"
              />
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 bg-white/80 text-black font-semibold px-4 py-1 rounded-lg shadow hover:bg-white transition"
              >
                Skip
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Game Screen */}
      {!showTutorial && (
        <div className="flex h-[100vh] w-[100vw] font-[coiny] overflow-hidden bg-cover bg-no-repeat" style={{ backgroundImage: `url(${BG})` }}>
          <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>

          <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
            {/* Draggables */}
            <div className="flex absolute gap-30 mt-10 w-[100vw] h-[300px] justify-center z-10 top-[10%] p-4 rounded-lg">
              {animals.map(animal =>
                !dropped[animal.id] && (
                  <Draggable
                    key={animal.id}
                    id={animal.id}
                    shape={<img src={animal.img} alt={animal.id} className="h-[130px] object-contain" />}
                  />
                )
              )}
            </div>

            {/* Droppables */}
            <div className="flex h-[50%] w-[100vw] justify-around absolute lg:bottom-0">
              <Droppable
                id="water"
                shape={<img src={WaterDroppable} alt="Water Droppable" className="h-[100%]" />}
              />
              <Droppable
                id="land"
                shape={<img src={ForestDroppable} alt="Forest Droppable" className="h-[100%]" />}
              />
              <Droppable
                id="air"
                shape={<img src={AirDroppable} alt="Air Droppable" className="h-[100%]" />}
              />
            </div>

            {/* Results */}
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
                  <ReplayNBack onReplay={handleReplay} onBack={handleBack} />
                </div>
              </div>
            )}
            {isGameFinished && count > 15 && count <=20 && (
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
                  <ReplayNBack onReplay={handleReplay} onBack={handleBack} />
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
                <div className="absolute bottom-[20%]">
                  <ReplayNBack onReplay={handleReplay} onBack={handleBack} />
                </div>
              </div>
            )}
          </DndContext>
        </div>
      )}
    </>
  );
}

export default AnimalsLesson2Activity2;


