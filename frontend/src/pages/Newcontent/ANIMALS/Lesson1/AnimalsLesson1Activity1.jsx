import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";
import BG from "../../../../assets/Animals/Lesson1/Activity1Bg.webp";
import Quack from "../../../../assets/Animals/Lesson1/Quack.webp";
import Oink from "../../../../assets/Animals/Lesson1/Oink.webp";
import Moo from "../../../../assets/Animals/Lesson1/Moo.webp";
import Meow from "../../../../assets/Animals/Lesson1/Meow.webp";
import Arf from "../../../../assets/Animals/Lesson1/Arf.webp";
import Pig from "../../../../assets/Animals/Lesson1/Pig.webp";
import PigDone from "../../../../assets/Animals/Lesson1/PigDone.webp";
import Cat from "../../../../assets/Animals/Lesson1/Cat.webp";
import CatDone from "../../../../assets/Animals/Lesson1/CatDone.webp";
import Cow from "../../../../assets/Animals/Lesson1/Cow.webp";
import CowDone from "../../../../assets/Animals/Lesson1/CowDone.webp";
import Dog from "../../../../assets/Animals/Lesson1/Dog.webp";
import DogDone from "../../../../assets/Animals/Lesson1/DogDone.webp";
import Duck from "../../../../assets/Animals/Lesson1/Duck.webp";
import DuckDone from "../../../../assets/Animals/Lesson1/DuckDone.webp";

import OneStar from "../../../../assets/Done/OneStar.webp";
import TwoStar from "../../../../assets/Done/TwoStar.webp";
import ThreeStar from "../../../../assets/Done/ThreeStar.webp";

import ReplayNBack from "../../../../components/ReplayNBack";
import backgroundMusic from "../../../../assets/Sounds/background.mp3";
import { motion, AnimatePresence } from "framer-motion";
import applause from "../../../../assets/Sounds/applause.wav";
import { useWithSound } from "../../../../components/useWithSound";
import { useNavigate } from "react-router-dom";

import catSound from "../../../../assets/Animals/Lesson2/catSound.mp3";
import cowSound from "../../../../assets/Animals/Lesson2/cowSound.mp3";
import dogSound from "../../../../assets/Animals/Lesson2/dogSound.mp3";  // adjusted path
import pigSound from "../../../../assets/Sounds/pigoink.mp3";             // keep correct path
import duckSound from "../../../../assets/Animals/Lesson2/duckSound.mp3";
import api from "../../../../api";


import SoundTutorial from "../../../../assets/videos/SoundTutorial1.mp4";  // ← your tutorial video path

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
      className="w-full h-full flex items-center justify-center"
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


function AnimalsLessonActivity1() {
    const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);
  const [dropped, setDropped] = useState({});
  const [count, setCount] = useState(0);
  


  
  const selectedChild = JSON.parse(localStorage.getItem("selectedChild"));
  const childId = selectedChild?.id; // this is the child ID you need


  // Tutorial state
  const [showTutorial, setShowTutorial] = useState(true);
  const handleVideoEnd = () => setShowTutorial(false);
  const handleSkip = () => setShowTutorial(false);

  function handleDragEnd(event) {
    if (event.over) {
      const draggedId = event.active.id;
      const droppedId = event.over.id;

      if (draggedId === droppedId) {
        let sound;
        switch (draggedId) {
          case "meow":
            sound = new Audio(catSound);
            break;
          case "moo":
            sound = new Audio(cowSound);
            break;
          case "arf":
            sound = new Audio(dogSound);
            break;
          case "oink":
            sound = new Audio(pigSound);
            break;
          case "quack":
            sound = new Audio(duckSound);
            break;
          default:
            break;
        }
        if (sound) {
          sound.volume = 1.0;
          sound.play().catch(err => console.log("Sound playback blocked:", err));
        }

        setDropped(prev => ({ ...prev, [draggedId]: droppedId }));
      }
    }
  }

  const isGameFinished = dropped["arf"] && dropped["meow"] && dropped["moo"] && dropped["oink"] && dropped["quack"];

  useEffect(() => {
    if (showTutorial) return;  // only start background music after tutorial
    const bgSound = new Audio(backgroundMusic);
    bgSound.loop = true;
    bgSound.volume = 0.3;
    bgSound.play().catch(err => console.log("Autoplay blocked:", err));
    return () => {
      bgSound.pause();
      bgSound.currentTime = 0;
    };
  }, [showTutorial]);

  useEffect(() => {
  let soundTimeout;
  if (isGameFinished) {
    playApplause();

    soundTimeout = setTimeout(() => stopApplause(), 8000);
  }
  return () => {
    clearTimeout(soundTimeout);
    stopApplause();
  };
}, [isGameFinished, playApplause, stopApplause]);




  useEffect(() => {
    if (showTutorial) return;  // don’t count time during tutorial
    if (isGameFinished) return;
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameFinished, showTutorial]);

  const resetGame = () => {
    setDropped({});
    setCount(0);
    setShowTutorial(true);
  };
  const handleReplay = () => {
    stopApplause();
    resetGame();
  };
  const handleBack = () => {
    stopApplause();
    navigate("/shapes");
  };

  useEffect(() => {
  if (isGameFinished && childId) {
    const saveRecord = async () => {
      const payload = {
        child_id: childId,
        game: "Lesson1 Activity1",
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
      {/* Tutorial Pop-Up Video */}
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
                src={SoundTutorial}
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
        <div className="flex h-[100vh] w-[100vw] font-[coiny] fixed overflow-hidden bg-cover bg-no-repeat"
             style={{ backgroundImage: `url(${BG})` }}>
          <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>

          <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
            {/* Droppables */}
            <div className="flex absolute top-40 2xl:top-60 items-center justify-center h-full w-full">
              <Droppable
                id="meow"
                shape={<img src={Cat} alt="Cat" className="w-[200px] h-[200px] 2xl:w-[250px] 2xl:h-[250px] object-contain" />}
                placedShape={dropped["meow"] && <img src={CatDone} alt="Cat Done" className="w-[300px] h-[300px] 2xl:w-[350px] 2xl:h-[350px] object-contain" />}
              />
              <Droppable
                id="oink"
                shape={<img src={Pig} alt="Pig" className="w-[140px] h-[140px] 2xl:w-[250px] 2xl:h-[250px] object-contain" />}
                placedShape={dropped["oink"] && <img src={PigDone} alt="Pig Done" className="w-[350px] h-[350px] 2xl:w-[350px] 2xl:h-[350px] object-contain" />}
              />
              <Droppable
                id="moo"
                shape={<img src={Cow} alt="Cow" className="w-[200px] h-[200px] 2xl:w-[250px] 2xl:h-[250px] object-contain" />}
                placedShape={dropped["moo"] && <img src={CowDone} alt="Cow Done" className="w-[350px] h-[350px] 2xl:w-[350px] 2xl:h-[350px] object-contain" />}
              />
              <Droppable
                id="quack"
                shape={<img src={Duck} alt="Duck" className="w-[200px] h-[200px] 2xl:w-[250px] 2xl:h-[250px] object-contain" />}
                placedShape={dropped["quack"] && <img src={DuckDone} alt="Duck Done" className="w-[350px] h-[350px] 2xl:w-[350px] 2xl:h-[350px] object-contain" />}
              />
              <Droppable
                id="arf"
                shape={<img src={Dog} alt="Dog" className="w-[200px] h-[200px] 2xl:w-[250px] 2xl:h-[250px] object-contain" />}
                placedShape={dropped["arf"] && <img src={DogDone} alt="Dog Done" className="w-[350px] h-[350px] 2xl:w-[350px] 2xl:h-[350px] object-contain" />}
              />
            </div>

            {/* Draggables */}
            <div className="flex absolute gap-6 w-[100vw] justify-center z-10 top-40 2xl:top-50 p-4">
              {!dropped["quack"] && <Draggable id="quack" shape={<img src={Quack} alt="Quack" className="h-30 w-auto 2xl:h-48 object-contain" />} />}
              {!dropped["meow"] && <Draggable id="meow" shape={<img src={Meow} alt="Meow" className="h-30 w-auto 2xl:h-48 object-contain" />} />}
              {!dropped["moo"] && <Draggable id="moo" shape={<img src={Moo} alt="Moo" className="h-30 w-auto 2xl:h-48 object-contain" />} />}
              {!dropped["oink"] && <Draggable id="oink" shape={<img src={Oink} alt="Oink" className="h-30 w-auto 2xl:h-48 object-contain" />} />}
              {!dropped["arf"] && <Draggable id="arf" shape={<img src={Arf} alt="Arf" className="h-30 w-auto 2xl:h-48 object-contain" />} />}
            </div>

            {/* Results */}
            {isGameFinished && count <= 15 && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
                <motion.img
                  src={ThreeStar}
                  alt="Game Completed!"
                  className="h-[300px]"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <div className="absolute bottom-[20%]"><ReplayNBack onReplay={handleReplay} onBack={handleBack} /></div>
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
                <div className="absolute bottom-[20%]"><ReplayNBack onReplay={handleReplay} onBack={handleBack} /></div>
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
                <div className="absolute bottom-[20%]"><ReplayNBack onReplay={handleReplay} onBack={handleBack} /></div>
              </div>
            )}
          </DndContext>
        </div>
      )}
    </>
  );
}

export default AnimalsLessonActivity1;


