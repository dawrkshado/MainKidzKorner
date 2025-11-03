import { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";
import BG from "../../../../assets/Animals/Lesson5/bg.webp";
import Hamster from "../../../../assets/Animals/Lesson5/hamster.webp";
import Tiger from "../../../../assets/Animals/Lesson5/tiger.webp";
import Lion from "../../../../assets/Animals/Lesson4/Lion.webp";
import Elephant from "../../../../assets/Animals/Lesson4/Elephant.webp";
import Cat from "../../../../assets/Animals/Lesson3/Cat.webp";
import Dog from "../../../../assets/Animals/Lesson1/Dog.webp";
import petDroppable from "../../../../assets/Animals/Lesson5/petDroppable.webp";
import WildDroppable from "../../../../assets/Animals/Lesson5/wildDroppable.webp";
import OneStar from "../../../../assets/Done/OneStar.webp";
import TwoStar from "../../../../assets/Done/TwoStar.webp";
import ThreeStar from "../../../../assets/Done/ThreeStar.webp";
import ReplayNBack from "../../../../components/ReplayNBack";
import backgroundMusic from "../../../../assets/Sounds/background.mp3";
import { motion } from "framer-motion";
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
      className="flex items-center justify-center h-100 w-100"
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

function AnimalsLesson5Activity1() {
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);
  const [dropped, setDropped] = useState([]);
  const [count, setCount] = useState(0);

  const animalTypes = {
    dog: "pet",
    hamster: "pet",
    cat: "pet",
    tiger: "wild",
    elephant: "wild",
    lion: "wild",
  };

  function handleDragEnd(event) {
    if (event.over) {
      const draggedId = event.active.id;
      const droppedId = event.over.id;
      if (animalTypes[draggedId] === droppedId && !dropped.includes(draggedId)) {
        setDropped((prev) => [...prev, draggedId]);
      }
    }
  }

  const isGameFinished = dropped.length === 6;

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
    setDropped([]);
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
        className="flex h-[100vh] w-[100vw] [&>*]:flex absolute font-[coiny] overflow-hidden bg-bottom bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>
        <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>

          {/* Droppables */}
          <div className="flex absolute top-60 gap-20 2xl:gap-50 2xl:top-80 items-center justify-center w-[100vw] h-[40vw]">
            <Droppable
              id="pet"
              shape={<img src={petDroppable} alt="Pet animals" className="h-[70%] 2xl:h-[100%] object-contain" />}
              placedShape={
                dropped.some((id) => animalTypes[id] === "pet") && (
                  <img src={petDroppable} alt="Pet animals" className="h-[70%] object-contain" />
                )
              }
            />
            <Droppable
              id="wild"
              shape={<img src={WildDroppable} alt="Wild animals" className="h-[70%] 2xl:h-[100%] object-contain" />}
              placedShape={
                dropped.some((id) => animalTypes[id] === "wild") && (
                  <img src={WildDroppable} alt="Wild animals" className="h-[70%] object-contain" />
                )
              }
            />
          </div>

          {/* Draggables */}
          <div className="flex absolute gap-6 w-[100vw] justify-center items-center z-10 top-30">
            {!dropped.includes("dog") && (
              <Draggable 
                id="dog" 
                shape={
                  <img 
                    src={Dog} 
                    alt="Dog" 
                    className="h-40 w-40 2xl:h-70 2xl:w-70 object-contain" 
                  />
                } 
              />
            )}
            {!dropped.includes("tiger") && (
              <Draggable 
                id="tiger" 
                shape={
                  <img 
                    src={Tiger} 
                    alt="Tiger" 
                    className="h-40 w-40 2xl:h-70 2xl:w-70 object-contain" 
                  />
                } 
              />
            )}
            {!dropped.includes("hamster") && (
              <Draggable 
                id="hamster" 
                shape={
                  <img 
                    src={Hamster} 
                    alt="Hamster" 
                    className="h-40 w-40 2xl:h-70 2xl:w-70 object-contain" 
                  />
                } 
              />
            )}
            {!dropped.includes("elephant") && (
              <Draggable 
                id="elephant" 
                shape={
                  <img 
                    src={Elephant} 
                    alt="Elephant" 
                    className="h-40 w-40 2xl:h-70 2xl:w-70 object-contain" 
                  />
                } 
              />
            )}
            {!dropped.includes("lion") && (
              <Draggable 
                id="lion" 
                shape={
                  <img 
                    src={Lion} 
                    alt="Lion" 
                    className="h-40 w-40 2xl:h-70 2xl:w-70 object-contain" 
                  />
                } 
              />
            )}
            {!dropped.includes("cat") && (
              <Draggable 
                id="cat" 
                shape={
                  <img 
                    src={Cat} 
                    alt="Cat" 
                    className="h-40 w-40 2xl:h-70 2xl:w-70 object-contain" 
                  />
                } 
              />
            )}
          </div>

          {/*Results*/}
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
                <ReplayNBack />
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
              <div className="absolute bottom-[20%]">
                <ReplayNBack />
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
                <ReplayNBack />
              </div>
            </div>
          )}
        </DndContext>
      </div>
    </>
  );
}

export default AnimalsLesson5Activity1;