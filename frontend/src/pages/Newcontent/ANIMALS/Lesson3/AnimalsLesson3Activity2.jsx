import { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import BG from "../../../../assets/Animals/Lesson3/bg2.webp";
import Chick from "../../../../assets/Animals/Lesson3/Chick.webp";
import Kitten from "../../../../assets/Animals/Lesson3/Kitten.webp";
import Puppy from "../../../../assets/Animals/Lesson3/Puppy.webp";
import Sheep from "../../../../assets/Animals/Lesson3/Sheep.webp";
import Cat from "../../../../assets/Animals/Lesson3/Cat.webp";
import CatDone from "../../../../assets/Animals/Lesson3/CatDone.webp";
import Cow from "../../../../assets/Animals/Lesson3/Cow.webp";
import CowDone from "../../../../assets/Animals/Lesson3/CowDone.webp";
import Dog from "../../../../assets/Animals/Lesson3/Dog.webp";
import DogDone from "../../../../assets/Animals/Lesson3/DogDone.webp";
import Chicken from "../../../../assets/Animals/Lesson3/Chicken.webp";
import ChickenDone from "../../../../assets/Animals/Lesson3/ChickenDone.webp";
import Duck from "../../../../assets/Animals/Lesson1/Duck.webp";
import OneStar from "../../../../assets/Done/OneStar.webp";
import TwoStar from "../../../../assets/Done/TwoStar.webp";
import ThreeStar from "../../../../assets/Done/ThreeStar.webp";
import ReplayNBack from "../../../../components/ReplayNBack";
import backgroundMusic from "../../../../assets/Sounds/background.mp3";
import applause from "../../../../assets/Sounds/applause.wav";
import { useWithSound } from "../../../../components/useWithSound";
import { useNavigate } from "react-router-dom";
import KittenDialogue from "../../../../assets/Animals/Lesson3/KittenDialogue.webp";
import PuppyDialogue from "../../../../assets/Animals/Lesson3/PuppyDialogue.webp";
import ChickDialogue from "../../../../assets/Animals/Lesson3/ChickDialogue.webp";

function Droppable({ id, placedShape, shape }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = { opacity: isOver ? "0.5" : "1", zIndex: isOver ? "10" : "1" };

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

const PROGRESS_KEY = "alphabetMediumProgress";

function saveProgress(level) {
  const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || { level1: false, level2: false };
  progress[level] = true;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function AnimalsLessonActivity2() {
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);
  const [dropped, setDropped] = useState({});
  const [currentRound, setCurrentRound] = useState(1); // ✅ for fade transition
  const [count, setCount] = useState(1);

  function handleDragEnd(event) {
    if (event.over) {
      const draggedId = event.active.id;
      const droppedId = event.over.id;

      if (draggedId === droppedId) {
        setDropped((prev) => ({ ...prev, [draggedId]: droppedId }));

        // ✅ round progression
       if (draggedId === "dog") {
  setTimeout(() => setCurrentRound(2), 1000); // wait 1s before next round
}
if (draggedId === "cat") {
  setTimeout(() => setCurrentRound(3), 1000);
}

      }
    }
  }

  const isGameFinished = dropped["cat"] && dropped["dog"] && dropped["chicken"];

  useEffect(() => {
    const bgSound = new Audio(backgroundMusic);
    bgSound.loop = true;
    bgSound.volume = 0.3;
    bgSound.play().catch(() => {});
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
      soundTimeout = setTimeout(() => stopApplause(), 8000);
    }
    return () => {
      clearTimeout(soundTimeout);
      stopApplause();
    };
  }, [isGameFinished, playApplause, stopApplause]);

  useEffect(() => {
    if (isGameFinished) return;
    const interval = setInterval(() => setCount((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isGameFinished]);

  const resetGame = () => {
    setDropped({});
    setCount(0);
    setCurrentRound(1);
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
          <AnimatePresence mode="wait">
            {currentRound === 1 && (
              <motion.div
                key="round1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Round 1: Dog */}
                <div className="absolute top-[45%] w-[100vw] flex justify-center gap-20">
                  <Droppable id="cat" shape={<img src={Cat} className="w-[40%]" />} />
                  <Droppable id="cow" shape={<img src={Cow} className="w-[60%]" />} />
                  <Droppable
                    id="dog"
                    shape={<img src={Dog} className="w-[50%]" />}
                    placedShape={
                    dropped["dog"] && <img src={DogDone} className="w-[100%]" alt="dog done" />
}
                  />
                </div>

                <div className="flex absolute gap-30 mt-10 w-[8%]  right-[45%] top-[25%] 2xl:right-[45%] 2xl:top-[32%] justify-center  z-10 ">
                  {!dropped["dog"] && (
                    <Draggable id="dog" shape={<img src={Puppy} alt="dog" className="h-[100%]" />} />
                  )}
                </div>

                <div className="absolute h-[25%] right-[33%] top-[10%] 2xl:right-[33%] 2xl:top-[13%] "><img src={PuppyDialogue} alt="dialogue for a puppy that says i am a puppy who is my mama?" className="h-[100%] "/></div>
                
              </motion.div>
            )}

            {currentRound === 2 && (
              <motion.div
                key="round2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Round 2: Cat */}
                <div className="absolute top-[45%] w-[100vw] flex justify-center gap-20">
                  
                  <Droppable
                    id="cat"
                    shape={<img src={Cat} className="w-[40%]" />}
                    placedShape={
                      dropped["cat"] && (
                        <Draggable id="cat" shape={<img src={CatDone} className="h-[100%]" />} disabled={true} />
                      )
                    }
                  />
                  <Droppable id="cow" shape={<img src={Cow} className="w-[60%]" />} />
                  <Droppable id="sheep" shape={<img src={Sheep} className="w-[60%]" />} />
                </div>
                <div className="flex absolute gap-30 mt-10 w-[8%]  right-[45%] top-[26%] 2xl:right-[45%] 2xl:top-[35%] justify-center  z-10 ">
                  {!dropped["cat"] && (
                    <Draggable id="cat" shape={<img src={Kitten} alt="cat" className="h-[100%]" />} />
                  )}
                </div>
                 <div className="absolute h-[25%] right-[33%] top-[10%] 2xl:right-[33%] 2xl:top-[13%] "><img src={KittenDialogue} alt="dialogue for kitten that says i am a kitten who is my mama?" className="h-[100%] "/></div>
              </motion.div>
            )}

            {currentRound === 3 && !isGameFinished && (
              <motion.div
                key="round3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Round 3: Chicken */}
                <div className="absolute top-[45%] w-[100vw] flex justify-center gap-20">
                  <Droppable id="duck" shape={<img src={Duck} className="w-[40%]" />} />
                  <Droppable
                    id="chicken"
                    shape={<img src={Chicken} className="w-[40%]" />}
                    placedShape={
                      dropped["chicken"] && (
                        <Draggable id="chicken" shape={<img src={ChickenDone} className="h-[90%]" />} disabled={true} />
                      )
                    }
                  />
                  <Droppable id="sheep" shape={<img src={Sheep} className="w-[40%]" />} />
                </div>
                <div className="flex absolute gap-30 mt-10 w-[8%]  right-[45%] top-[25%] 2xl:right-[45%] 2xl:top-[32%] justify-center  z-10 ">
                  {!dropped["chicken"] && (
                    <Draggable id="chicken" shape={<img src={Chick} alt="chick" className="h-[90%]" />} />
                  )}
                </div>
                <div className="absolute h-[25%] right-[33%] top-[10%] 2xl:right-[33%] 2xl:top-[13%] "><img src={ChickDialogue} alt="dialogue for a chick that says i am a chick who is my mama?" className="h-[100%] "/></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          {isGameFinished && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
              <motion.img
                src={count <= 15 ? ThreeStar : count <= 20 ? TwoStar : OneStar}
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

export default AnimalsLessonActivity2;
