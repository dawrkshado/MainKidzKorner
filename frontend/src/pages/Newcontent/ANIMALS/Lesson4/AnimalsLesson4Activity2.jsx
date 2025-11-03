import { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";

import BG from "../../../../assets/Animals/Lesson4/bg2.webp"
import Armadilo from "../../../../assets/Animals/Lesson4/Armadilo.webp"
import Bear from "../../../../assets/Animals/Lesson4/Bear.webp"
import Bunny from "../../../../assets/Animals/Lesson4/Bunny.webp"
import Camel from "../../../../assets/Animals/Lesson4/Camel.webp"
import Elephant from "../../../../assets/Animals/Lesson4/Elephant.webp"
import Fish from "../../../../assets/Animals/Lesson4/Fish2.webp"
import Frog from "../../../../assets/Animals/Lesson4/Frog.webp"
import Lion from "../../../../assets/Animals/Lesson4/Lion.webp"
import Monkey from "../../../../assets/Animals/Lesson4/Monkey.webp"
import Penguin from "../../../../assets/Animals/Lesson4/Penguin.webp"
import PolarBear from "../../../../assets/Animals/Lesson4/PolarBear.webp"
import Scorpion from "../../../../assets/Animals/Lesson4/Scorpion.webp"
import Seal from "../../../../assets/Animals/Lesson4/Seal.webp"
import Zebra from "../../../../assets/Animals/Lesson4/Zebra.webp"
import Alligator from "../../../../assets/Animals/Lesson4/Alligator.webp"

import Arctic from "../../../../assets/Animals/Lesson4/ArcticDroppable.webp"
import PigDone from "../../../../assets/Animals/Lesson1/PigDone.webp"
import desert from "../../../../assets/Animals/Lesson4/desertDroppable.webp"
import CatDone from "../../../../assets/Animals/Lesson1/CatDone.webp"
import Forest from "../../../../assets/Animals/Lesson4/ForestDroppable.webp"
import CowDone from "../../../../assets/Animals/Lesson1/CowDone.webp"
import Savanna from "../../../../assets/Animals/Lesson4/SavannaDroppable.webp"
import DogDone from "../../../../assets/Animals/Lesson1/DogDone.webp"
import Swamp from "../../../../assets/Animals/Lesson4/SwampDroppable.webp"
import DuckDone from "../../../../assets/Animals/Lesson1/DuckDone.webp"

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
      className={`flex items-center justify-center h-100 w-100`}
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

function AnimalsLesson4Activity2() {
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);
  const [dropped, setDropped] = useState([]);
  const [count, setCount] = useState(0);

  const animalHabitats = {
    armadilo: "desert",
    camel: "desert",
    scorpion: "desert",
    bear: "forest",
    bunny: "forest",
    monkey: "forest",
    penguin: "arctic",
    polarbear: "arctic",
    seal: "arctic",
    alligator: "swamp",
    fish: "swamp",
    frog: "swamp",
    lion: "savanna",
    elephant: "savanna",
    zebra: "savanna"
  };

  function handleDragEnd(event) {
    if (event.over) {
      const draggedId = event.active.id;
      const droppedId = event.over.id;

      if (animalHabitats[draggedId] === droppedId && !dropped.includes(draggedId)) {
        setDropped((prev) => [...prev, draggedId]);
      }
    }
  }

  const isGameFinished = dropped.length === 15;

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
      <div className="flex h-[100vh] w-[100vw] [&>*]:flex absolute font-[coiny] overflow-hidden bg-cover bg-no-repeat" style={{ backgroundImage: `url(${BG})` }} >
        <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>

        <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
          {/* Droppables */}
          <div className="flex absolute top-70 2xl:top-120 items-center justify-center w-[100vw] h-[40vw] ">
            <Droppable
              id="desert"
              shape={<img src={desert} alt="The desert" className="h-[60%] 2xl:h-[100%] object-contain" />}
              placedShape={
                dropped.some(id => animalHabitats[id] === "desert") && (
                  <img src={desert} alt="The desert" className="h-[60%] 2xl:h-[100%] object-contain" />
                )
              }
            />

            <Droppable
              id="arctic"
              shape={<img src={Arctic} alt="The Arctic" className="h-[60%] 2xl:h-[100%] object-contain" />}
              placedShape={
                dropped.some(id => animalHabitats[id] === "arctic") && (
                  <img src={Arctic} alt="The Arctic" className="h-[60%] 2xl:h-[100%] object-contain" />
                )
              }
            />
            <Droppable
              id="forest"
              shape={<img src={Forest} alt="The Forest" className="h-[60%] 2xl:h-[100%] object-contain" />}
              placedShape={
                dropped.some(id => animalHabitats[id] === "forest") && (
                  <img src={Forest} alt="The Forest" className="h-[60%] 2xl:h-[100%] object-contain" />
                )
              }
            />

            <Droppable
              id="swamp"
              shape={<img src={Swamp} alt="Swamp" className="h-[60%] 2xl:h-[100%] object-contain" />}
              placedShape={
                dropped.some(id => animalHabitats[id] === "swamp") && (
                  <img src={Swamp} alt="Swamp" className="h-[60%] 2xl:h-[100%] object-contain" />
                )
              }
            />
            <Droppable
              id="savanna"
              shape={<img src={Savanna} alt="The Savanna" className="h-[60%] 2xl:h-[100%] object-contain" />}
              placedShape={
                dropped.some(id => animalHabitats[id] === "savanna") && (
                  <img src={Savanna} alt="The Savanna" className="h-[60%] 2xl:h-[100%] object-contain" />
                )
              }
            />
          </div>

          {/* Draggables */}
          <div className="absolute w-[100vw] h-[calc(100vh-250px)] top-0 pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">
              {!dropped.includes("armadilo") && (
                <div className="absolute top-[5%] left-[8%]">
                  <Draggable
                    id="armadilo"
                    shape={<img src={Armadilo} alt="Armadilo" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("camel") && (
                <div className="absolute top-40 left-15 2xl:top-60">
                  <Draggable
                    id="camel"
                    shape={<img src={Camel} alt="Camel" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("bunny") && (
                <div className="absolute top-67 left-[28%]">
                  <Draggable
                    id="bunny"
                    shape={<img src={Bunny} alt="Bunny" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("bear") && (
                <div className="absolute top-27 left-[38%] 2xl:left-[40%]">
                  <Draggable
                    id="bear"
                    shape={<img src={Bear} alt="Bear" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("elephant") && (
                <div className="absolute top-[60%] left-[48%] 2xl:top-[55%] 2xl:left-[30%]">
                  <Draggable
                    id="elephant"
                    shape={<img src={Elephant} alt="Elephant" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("alligator") && (
                <div className="absolute top-[4%] left-[58%]">
                  <Draggable
                    id="alligator"
                    shape={<img src={Alligator} alt="Alligator" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("fish") && (
                <div className="absolute bottom-[15%] right-[15%] 2xl:bottom-[30%] 2xl:right-[30%]">
                  <Draggable
                    id="fish"
                    shape={<img src={Fish} alt="Fish" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("frog") && (
                <div className="absolute top-[4%] right-[10%] 2xl:top-[55%] 2xl:right-[20%] ">
                  <Draggable
                    id="frog"
                    shape={<img src={Frog} alt="Frog" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("lion") && (
                <div className="absolute top-70 left-[3%] 2xl:top-130">
                  <Draggable
                    id="lion"
                    shape={<img src={Lion} alt="Lion" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("monkey") && (
                <div className="absolute top-50 left-[15%] 2xl:top-85">
                  <Draggable
                    id="monkey"
                    shape={<img src={Monkey} alt="Monkey" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("penguin") && (
                <div className="absolute top-35 left-90 2xl:left-[90%]">
                  <Draggable
                    id="penguin"
                    shape={<img src={Penguin} alt="Penguin" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("polarbear") && (
                <div className="absolute right-[2%] top-45 2xl:top-[50%] ">
                  <Draggable
                    id="polarbear"
                    shape={<img src={PolarBear} alt="Polar Bear" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("scorpion") && (
                <div className="absolute top-[6%] left-[30%] 2xl:left-[28%]">
                  <Draggable
                    id="scorpion"
                    shape={<img src={Scorpion} alt="Scorpion" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("seal") && (
                <div className="absolute top-[35%] left-[55%] 2xl:left-[50%]">
                  <Draggable
                    id="seal"
                    shape={<img src={Seal} alt="Seal" className="h-[120px] w-auto" />}
                  />
                </div>
              )}

              {!dropped.includes("zebra") && (
                <div className="absolute top-[25%] right-[20%]">
                  <Draggable
                    id="zebra"
                    shape={<img src={Zebra} alt="Zebra" className="h-[120px] w-auto" />}
                  />
                </div>
              )}
            </div>
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

export default AnimalsLesson4Activity2;