import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";

import BG from "../../../../assets/Animals/Lesson1/Activity2BG.webp";
import Bird from "../../../../assets/Animals/Lesson1/Bird.webp";
import Horse from "../../../../assets/Animals/Lesson1/Horse.webp";
import Snake from "../../../../assets/Animals/Lesson1/Snake.webp";
import Bunny from "../../../../assets/Animals/Lesson1/Bunny.webp";
import Fish from "../../../../assets/Animals/Lesson1/Fish.webp";

import SwimDroppable from "../../../../assets/Animals/Lesson1/SwimDroppable.webp";
import RunDroppable from "../../../../assets/Animals/Lesson1/RunDroppable.webp";
import CrawlDroppable from "../../../../assets/Animals/Lesson1/CrawlDroppable.webp";
import FlyDroppable from "../../../../assets/Animals/Lesson1/FlyDroppable.webp";
import HopDroppable from "../../../../assets/Animals/Lesson1/HopDroppable.webp";

import OneStar from "../../../../assets/Done/OneStar.webp";
import TwoStar from "../../../../assets/Done/TwoStar.webp";
import ThreeStar from "../../../../assets/Done/ThreeStar.webp";

import ReplayNBack from "../../../../components/ReplayNBack";
import backgroundMusic from "../../../../assets/Sounds/background.mp3";

import { motion, AnimatePresence } from "framer-motion";
import MoveTutorial from "../../../../assets/videos/MoveTutorial1.mp4";  // ← Your tutorial video path

import applause from "../../../../assets/Sounds/applause.wav";
import { useWithSound } from "../../../../components/useWithSound";
import { useNavigate } from "react-router-dom";

import api from "../../../../api";

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

const PROGRESS_KEY = "alphabetMediumProgress";

function saveProgress(level) {
  const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {
    level1: false,
    level2: false,
  };
  progress[level] = true;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function AnimalsLesson2Activity1() {
    const selectedChild = JSON.parse(localStorage.getItem("selectedChild"));
  const childId = selectedChild?.id; // this is the child ID you need

  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } =
    useWithSound(applause);
  const [dropped, setDropped] = useState({});
  const [count, setCount] = useState(0);

  const isGameFinished =
    dropped["swims"] &&
    dropped["hops"] &&
    dropped["crawls"] &&
    dropped["runs"] &&
    dropped["fly"];

  // --- Tutorial pop-up logic ---
  const [showTutorial, setShowTutorial] = useState(true);

  const handleVideoEnd = () => {
    setShowTutorial(false);
  };

  const handleSkip = () => {
    setShowTutorial(false);
  };

  // --- Background music setup for game (unchanged) ---
  useEffect(() => {
    if (showTutorial) return;  // do not auto play until tutorial is done
    const bgSound = new Audio(backgroundMusic);
    bgSound.loop = true;
    bgSound.volume = 0.3;
    bgSound
      .play()
      .catch((err) => {
        console.log("Autoplay blocked by browser (user interaction required):", err);
      });
    return () => {
      bgSound.pause();
      bgSound.currentTime = 0;
    };
  }, [showTutorial]);

  // --- timer logic (unchanged) ---
  useEffect(() => {
    if (isGameFinished) return;
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameFinished]);

  // --- finish logic, sound etc (unchanged) ---
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

  const resetGame = () => {
    setDropped({});
    setCount(0);
  };

  const handleReplay = () => {
    stopApplause();
    resetGame();
    setShowTutorial(true); // Replay includes tutorial
  };

  const handleBack = () => {
    stopApplause();
    navigate("/shapes");
  };

  const isPlaced = (id) => dropped[id] === id;

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

    useEffect(() => {
  if (isGameFinished && childId) {
    const saveRecord = async () => {
      const payload = {
        child_id: childId,
        game: "Lesson2 Activity1",
        level: 1,
        time: count
      };

      console.log("📤 Sending progress data:", payload); // ✅ Check this in console

      try {
        const response = await api.post("/api/save_progress/", payload);
        console.log("✅ Game progress saved successfully:", response.data);
      } catch (err) {
        console.error("❌ Error saving progress:", err.response?.data || err.message);
      }
    };

    saveRecord();
  }
}, [isGameFinished, childId, count]);

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
                src={MoveTutorial}
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
        <div
          className="flex h-[100vh] w-[100vw] [&>*]:flex absolute font-[coiny] overflow-hidden bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${BG})` }}
        >
          <div className="absolute top-0 right-0 text-white">
            Your Time: {count}
          </div>

          <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
            {/* Draggables */}
            <div className="flex absolute gap-30 mt-10 w-[100vw] h-[300px] justify-center z-10 top-100 lg:top-115 p-4 rounded-lg">
              {!dropped["fly"] && (
                <Draggable
                  id="fly"
                  shape={<img src={Bird} alt="Bird" className="h-[80px]" />}
                />
              )}
              {!dropped["hops"] && (
                <Draggable
                  id="hops"
                  shape={<img src={Bunny} alt="Bunny" className="h-[80px]" />}
                />
              )}
              {!dropped["crawls"] && (
                <Draggable
                  id="crawls"
                  shape={<img src={Snake} alt="Snake" className="h-[80px]" />}
                />
              )}
              {!dropped["runs"] && (
                <Draggable
                  id="runs"
                  shape={<img src={Horse} alt="Horse" className="h-[80px]" />}
                />
              )}
              {!dropped["swims"] && (
                <Draggable
                  id="swims"
                  shape={<img src={Fish} alt="Fish" className="h-[80px]" />}
                />
              )}
            </div>

            {/* Droppables */}
            <div className="flex justify-center gap-30 absolute top-70 left-40 lg:top-85 lg:left-58">
              <Droppable
                id="swims"
                shape={<img src={SwimDroppable} alt="Swim" />}
                placedShape={
                  dropped["swims"] && (
                    <Draggable
                      id="swims"
                      shape={<img src={Fish} alt="Fish" className="h-20" />}
                      disabled={true}
                    />
                  )
                }
              />
              <Droppable
                id="runs"
                shape={<img src={RunDroppable} alt="Run" />}
                placedShape={
                  dropped["runs"] && (
                    <Draggable
                      id="runs"
                      shape={<img src={Horse} alt="Horse" className="h-20" />}
                      disabled={true}
                    />
                  )
                }
              />
              <Droppable
                id="crawls"
                shape={<img src={CrawlDroppable} alt="Crawl" />}
                placedShape={
                  dropped["crawls"] && (
                    <Draggable
                      id="crawls"
                      shape={<img src={Snake} alt="Snake" className="h-20" />}
                      disabled={true}
                    />
                  )
                }
              />
              <Droppable
                id="fly"
                shape={<img src={FlyDroppable} alt="Fly" />}
                placedShape={
                  dropped["fly"] && (
                    <Draggable
                      id="fly"
                      shape={<img src={Bird} alt="Bird" className="h-20" />}
                      disabled={true}
                    />
                  )
                }
              />
              <Droppable
                id="hops"
                shape={<img src={HopDroppable} alt="Hop" />}
                placedShape={
                  dropped["hops"] && (
                    <Draggable
                      id="hops"
                      shape={<img src={Bunny} alt="Bunny" className="h-20" />}
                      disabled={true}
                    />
                  )
                }
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
                <div className="absolute bottom-[20%] ">
                  <ReplayNBack onReplay={handleReplay} onBack={handleBack} />
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
                <div className="absolute bottom-[20%] ">
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

export default AnimalsLesson2Activity1;


