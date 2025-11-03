import { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";
import BG from "../../../../assets/Animals/Lesson4/Bg1.webp";
import Fish from "../../../../assets/Animals/Lesson4/Fish.webp";
import Lion from "../../../../assets/Animals/Lesson4/Lion.webp";
import Giraffe from "../../../../assets/Animals/Lesson4/Giraffe.webp";
import Monkey from "../../../../assets/Animals/Lesson4/Monkey.webp";
import PolarBear from "../../../../assets/Animals/Lesson4/PolarBear.webp";
import Seal from "../../../../assets/Animals/Lesson4/Seal.webp";
import Dog from "../../../../assets/Animals/Lesson4/FrameDroppable.webp";
import DogDone from "../../../../assets/Animals/Lesson3/DogDone.webp";
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
      className="flex items-center justify-center h-100 w-100  2xl:h-150 2xl:w-150"
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

function AnimalsLesson4Activity1() {
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);
  const [dropped, setDropped] = useState([]);
  const [count, setCount] = useState(1);

  const acceptedAnimals = ["monkey", "giraffe", "lion"];

  function handleDragEnd(event) {
    if (event.over) {
      const draggedId = event.active.id;
      const droppedId = event.over.id;

      if (droppedId === "savanna" && acceptedAnimals.includes(draggedId) && !dropped.includes(draggedId)) {
        setDropped((prev) => [...prev, draggedId]);
      }
    }
  }

  const isGameFinished = dropped.length === 3;

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
        className="flex h-[100vh] w-[100vw] [&>*]:flex absolute font-[coiny] overflow-hidden bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>

        <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
          {/* Droppables */}
          <div className="absolute top-0 items-center justify-center w-[100vw] h-[40vw]">
            <Droppable
              id="savanna"
              shape={<img src={Dog} alt="Drop zone" className="w-[100%] h-[100%] object-contain" />}
              placedShape={
                dropped.length > 0 && (
                  <Draggable
                    id="placed"
                    shape={<img src={Dog} alt="Dropped animals" className="h-[30%]" />}
                    disabled={true}
                  />
                )
              }
            />
          </div>

          {/* Draggables */}
         <div className="flex absolute gap-4 w-[100%] justify-center z-10 bottom-8 p-4">
 
  {!dropped.includes("monkey") && (
    <Draggable id="monkey" shape={<img src={Monkey} alt="Monkey" className="h-32 2xl:h-65 w-auto object-contain" />} />
  )}
   <Draggable id="fish" shape={<img src={Fish} alt="Fish" className="h-32 2xl:h-65 w-auto object-contain" />} />
  {!dropped.includes("giraffe") && (
    <Draggable id="giraffe" shape={<img src={Giraffe} alt="Giraffe" className="h-32 2xl:h-65 w-auto object-contain" />} />
  )}
   <Draggable id="polarbear" shape={<img src={PolarBear} alt="PolarBear" className="h-32 2xl:h-65 w-auto object-contain" />} />
  {!dropped.includes("lion") && (
    <Draggable id="lion" shape={<img src={Lion} alt="Lion" className="h-32 2xl:h-65 w-auto object-contain" />} />
  )}
 
  <Draggable id="seal" shape={<img src={Seal} alt="Seal" className="h-32  2xl:h-65 w-auto object-contain" />} />
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

export default AnimalsLesson4Activity1;