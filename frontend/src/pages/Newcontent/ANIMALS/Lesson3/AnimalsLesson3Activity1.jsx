import React, { useState, useEffect, useRef } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import BG from "../../../../assets/Animals/Lesson3/bg1.webp";
import Calf from "../../../../assets/Animals/Lesson3/Calf.webp";
import Chick from "../../../../assets/Animals/Lesson3/Chick.webp";
import Kitten from "../../../../assets/Animals/Lesson3/Kitten.webp";
import Lamb from "../../../../assets/Animals/Lesson3/Lamb.webp";
import Puppy from "../../../../assets/Animals/Lesson3/Puppy.webp";

import Sheep from "../../../../assets/Animals/Lesson3/Sheep.webp";
import SheepDone from "../../../../assets/Animals/Lesson3/SheepDone.webp";
import Cat from "../../../../assets/Animals/Lesson3/Cat.webp";
import CatDone from "../../../../assets/Animals/Lesson3/CatDone.webp";
import Cow from "../../../../assets/Animals/Lesson3/Cow.webp";
import CowDone from "../../../../assets/Animals/Lesson3/CowDone.webp";
import Dog from "../../../../assets/Animals/Lesson3/Dog.webp";
import DogDone from "../../../../assets/Animals/Lesson3/DogDone.webp";
import Chicken from "../../../../assets/Animals/Lesson3/Chicken.webp";
import ChickenDone from "../../../../assets/Animals/Lesson3/ChickenDone.webp";

import OneStar from "../../../../assets/Done/OneStar.webp";
import TwoStar from "../../../../assets/Done/TwoStar.webp";
import ThreeStar from "../../../../assets/Done/ThreeStar.webp";

import ReplayNBack from "../../../../components/ReplayNBack";
import backgroundMusic from "../../../../assets/Sounds/background.mp3";
import applause from "../../../../assets/Sounds/applause.wav";
import { useWithSound } from "../../../../components/useWithSound";

// Audio imports
import babycat from "../../../../assets/Animals/ExerciseSound/babycat.mp3";
import babydog from "../../../../assets/Animals/ExerciseSound/babydog.mp3";
import babychicken from "../../../../assets/Animals/ExerciseSound/babychicken.mp3";
import babycow from "../../../../assets/Animals/ExerciseSound/babycow.mp3";
import babysheep from "../../../../assets/Animals/ExerciseSound/babysheep.mp3";

const PROGRESS_KEY = "alphabetMediumProgress";
function saveProgress(level) {
  const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || { level1: false, level2: false };
  progress[level] = true;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

/* ---------- DnD helper components ---------- */
function Droppable({ id, placedShape, shape }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = { opacity: isOver ? 0.5 : 1, zIndex: isOver ? 10 : 1 };
  return (
    <div ref={setNodeRef} style={style} className="flex items-center justify-center h-100 w-100">
      {placedShape ? placedShape : shape}
    </div>
  );
}

function Draggable({ id, disabled = false, shape }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, disabled });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div ref={setNodeRef} style={style} {...(!disabled ? attributes : {})} {...(!disabled ? listeners : {})}>
      {shape}
    </div>
  );
}

/* ---------- Main component ---------- */
function AnimalsLessonActivity1() {
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);

  const [dropped, setDropped] = useState({});
  const [count, setCount] = useState(1);

  // audio refs for each baby sound
  const catAudioRef = useRef(null);
  const dogAudioRef = useRef(null);
  const chickenAudioRef = useRef(null);
  const cowAudioRef = useRef(null);
  const sheepAudioRef = useRef(null);

  // track currently playing audio so we can stop it
  const currentAudioRef = useRef(null);

  useEffect(() => {
    // initialize audio objects
    catAudioRef.current = new Audio(babycat);
    catAudioRef.current.volume = 0.9;

    dogAudioRef.current = new Audio(babydog);
    dogAudioRef.current.volume = 0.9;

    chickenAudioRef.current = new Audio(babychicken);
    chickenAudioRef.current.volume = 0.9;

    cowAudioRef.current = new Audio(babycow);
    cowAudioRef.current.volume = 0.9;

    sheepAudioRef.current = new Audio(babysheep);
    sheepAudioRef.current.volume = 0.9;

    // cleanup on unmount
    return () => {
      stopCurrentAudioInternal();
      [catAudioRef, dogAudioRef, chickenAudioRef, cowAudioRef, sheepAudioRef].forEach((r) => {
        if (r.current) {
          r.current.pause();
          r.current.currentTime = 0;
          r.current = null;
        }
      });
    };
  }, []);

  function stopCurrentAudioInternal() {
    const c = currentAudioRef.current;
    if (c) {
      try {
        c.pause();
        c.currentTime = 0;
      } catch (e) {}
      currentAudioRef.current = null;
    }
  }

  function playBabySoundForId(id) {
    stopCurrentAudioInternal();
    let toPlay = null;
    switch (id) {
      case "cat":
        toPlay = catAudioRef.current || new Audio(babycat);
        break;
      case "dog":
        toPlay = dogAudioRef.current || new Audio(babydog);
        break;
      case "chicken":
        toPlay = chickenAudioRef.current || new Audio(babychicken);
        break;
      case "cow":
        toPlay = cowAudioRef.current || new Audio(babycow);
        break;
      case "sheep":
        toPlay = sheepAudioRef.current || new Audio(babysheep);
        break;
      default:
        toPlay = null;
    }

    if (toPlay) {
      currentAudioRef.current = toPlay;
      toPlay.currentTime = 0;
      toPlay.play().catch((err) => {
        try {
          const fallback = new Audio(toPlay.src || babycat);
          fallback.volume = 0.9;
          currentAudioRef.current = fallback;
          fallback.play().catch(() => {});
        } catch (_) {}
      });
    }
  }

  function handleDragStart() {
    stopCurrentAudioInternal();
  }

  function handleDragEnd(event) {
    if (event.over) {
      const draggedId = event.active.id;
      const droppedId = event.over.id;

      if (draggedId === droppedId) {
        playBabySoundForId(draggedId);

        setDropped((prev) => ({
          ...prev,
          [draggedId]: droppedId,
        }));
      }
    }
  }

  const isGameFinished =
    Boolean(dropped["dog"]) &&
    Boolean(dropped["sheep"]) &&
    Boolean(dropped["cat"]) &&
    Boolean(dropped["chicken"]) &&
    Boolean(dropped["cow"]);

  // Background music
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

  // Applause when finished
  useEffect(() => {
    let applauseAudio;
    let soundTimeout;
    if (isGameFinished) {
      applauseAudio = new Audio(applause);
      applauseAudio.volume = 0.9;
      applauseAudio.play().catch(() => {});
      saveProgress("level1");
      soundTimeout = setTimeout(() => {
        if (applauseAudio) {
          applauseAudio.pause();
          applauseAudio.currentTime = 0;
        }
      }, 8000);
    }
    return () => {
      if (soundTimeout) clearTimeout(soundTimeout);
      if (applauseAudio) {
        applauseAudio.pause();
        applauseAudio.currentTime = 0;
      }
    };
  }, [isGameFinished]);

  // Timer
  useEffect(() => {
    if (isGameFinished) return;
    const interval = setInterval(() => setCount((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isGameFinished]);

  const resetGame = () => {
    stopCurrentAudioInternal();
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

  return (
    <>
      <div
        className="flex h-[100vh] w-[100vw] [&>*]:flex absolute font-[coiny] overflow-hidden bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>

        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
          {/* Droppables */}
          <div className="absolute top-60 items-center justify-center w-[100vw] h-[40vw] ">
            <Droppable
              id="cat"
              shape={<img src={Cat} alt="Mommy Cat" className="w-[60%] h-[60%] object-contain" />}
              placedShape={dropped["cat"] && <Draggable id="cat" shape={<img src={CatDone} alt="cat done" className="h-[30%]" />} disabled={true} />}
            />

            <Droppable
              id="sheep"
              shape={<img src={Sheep} alt="Mommy Sheep" className="w-[60%] h-[60%] object-contain" />}
              placedShape={dropped["sheep"] && <Draggable id="sheep" shape={<img src={SheepDone} alt="sheep done" className="h-[30%]" />} disabled={true} />}
            />

            <Droppable
              id="cow"
              shape={<img src={Cow} alt="Mommy Cow" className="w-[60%] h-[60%] object-contain" />}
              placedShape={dropped["cow"] && <Draggable id="cow" shape={<img src={CowDone} alt="cow done" className="h-[30%]" />} disabled={true} />}
            />

            <Droppable
              id="chicken"
              shape={<img src={Chicken} alt="Mommy Chicken" className="w-[60%] h-[60%] object-contain" />}
              placedShape={dropped["chicken"] && <Draggable id="chicken" shape={<img src={ChickenDone} alt="chicken done" className="h-[30%]" />} disabled={true} />}
            />

            <Droppable
              id="dog"
              shape={<img src={Dog} alt="Mommy Dog" className="w-[60%] h-[60%] object-contain" />}
              placedShape={dropped["dog"] && <Draggable id="dog" shape={<img src={DogDone} alt="dog done" className="h-[30%]" />} disabled={true} />}
            />
          </div>

          {/* Draggables */}
          <div className="flex absolute gap-30 mt-10 w-[100vw] h-[300px] justify-center z-10 top-70 lg:top-40 p-4 rounded-lg ">
            {!dropped["cow"] && (
              <Draggable id="cow" shape={<img src={Calf} alt="calf" className="h-[40%] cursor-pointer" onClick={() => playBabySoundForId("cow")} />} />
            )}

            {!dropped["sheep"] && (
              <Draggable id="sheep" shape={<img src={Lamb} alt="lamb" className="h-[40%] cursor-pointer" onClick={() => playBabySoundForId("sheep")} />} />
            )}

            {!dropped["cat"] && (
              <Draggable id="cat" shape={<img src={Kitten} alt="kitten" className="h-[40%] cursor-pointer" onClick={() => playBabySoundForId("cat")} />} />
            )}

            {!dropped["chicken"] && (
              <Draggable id="chicken" shape={<img src={Chick} alt="chick" className="h-[40%] cursor-pointer" onClick={() => playBabySoundForId("chicken")} />} />
            )}

            {!dropped["dog"] && (
              <Draggable id="dog" shape={<img src={Puppy} alt="puppy" className="h-[40%] cursor-pointer" onClick={() => playBabySoundForId("dog")} />} />
            )}
          </div>

          {/* Results / stars overlays */}
          {isGameFinished && count <= 15 && (
            <div className="absolute inset-0 flex items-center h-full w-full justify-center bg-opacity-50 z-20">
              <motion.img src={ThreeStar} alt="Three stars" className="h-[300px]" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} />
              <div className="absolute bottom-[20%] ">
                <ReplayNBack onReplay={handleReplay} onBack={handleBack} />
              </div>
            </div>
          )}

          {isGameFinished && count <= 20 && count > 15 && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
              <motion.img src={TwoStar} alt="Two stars" className="h-[300px]" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} />
              <div className="absolute bottom-[20%] ">
                <ReplayNBack onReplay={handleReplay} onBack={handleBack} />
              </div>
            </div>
          )}

          {isGameFinished && count > 20 && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
              <motion.img src={OneStar} alt="One star" className="h-[300px]" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} />
              <div className="absolute bottom-[20%] ">
                <ReplayNBack onReplay={handleReplay} onBack={handleBack} />
              </div>
            </div>
          )}
        </DndContext>
      </div>
    </>
  );
}

export default AnimalsLessonActivity1;


