import { useState, useEffect } from "react";
import bg from "../assets/Shapes/ShapesHard/bg.webp";
import wrongImage from "../assets/Alphabets/Hard/cross.gif";
import board from "../assets/Shapes/ShapesHard/board.webp";

import triangle from "../assets/Shapes/ShapesMedium/level1/draggableTriangle.webp";
import circle from "../assets/Shapes/ShapesMedium/level1/circleDraggable.webp";
import square from "../assets/Shapes/ShapesMedium/level1/draggableSquare.webp";
import oblong from "../assets/Shapes/ShapesMedium/level2/oblongDraggable.webp";
import star from "../assets/Shapes/ShapesMedium/level2/starDraggable.webp";

import OneStar from "../assets/Done/OneStar.webp";
import TwoStar from "../assets/Done/TwoStar.webp";
import ThreeStar from "../assets/Done/ThreeStar.webp";

import ReplayNBack from "../components/ReplayNBack";

import api from "../api";

import backgroundMusic from "../assets/Sounds/background.mp3";
import applause from "../assets/Sounds/applause.wav";
import { useWithSound } from "../components/useWithSound";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

const PROGRESS_KEY = "shapesHardProgress";

const getProgress = () => {
  return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {
    level1: false,
  };
};

const saveProgress = (newProgress) => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
};

function ShapesHardLevel1() {
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } =
    useWithSound(applause);
  const [clicked, setClicked] = useState([]);
  const [showWrong, setShowWrong] = useState(false);
  const selectedChild = JSON.parse(localStorage.getItem("selectedChild"));
  const childId = selectedChild?.id;

  const [dropped, setDropped] = useState({});
 

  const numbers = [
    { value: "triangle", img: triangle, top: 575, left: 395, width: 60, height: 60 },
    { value: "circle", img: circle, top: 450, left: 20, width: 70, height: 70 },
    { value: "oblong", img: oblong, top: 340, left: 850, width: 73, height: 73 },
    { value: "star", img: star, top: 500, left: 480, width: 45, height: 45 },
    { value: "square", img: square, top: 490, left: 1150, width: 40, height: 40 },
  ];

  const isGameFinished =
    dropped["triangle"] &&
    dropped["circle"] &&
    dropped["oblong"] &&
    dropped["star"] &&
    dropped["square"];

  useEffect(() => {
    const bgSound = new Audio(backgroundMusic);
    bgSound.loop = true;
    bgSound.volume = 0.3;

    bgSound
      .play()
      .catch((err) =>
        console.log("Autoplay blocked. User must interact to enable sound.", err)
      );

    return () => {
      bgSound.pause();
      bgSound.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    let soundTimeout;

    if (isGameFinished) {
      playApplause();

      const progress = getProgress();
      progress.level1 = true;
      saveProgress(progress);

      soundTimeout = setTimeout(() => {
        stopApplause();
      }, 8000);
    }

    return () => {
      clearTimeout(soundTimeout);
      stopApplause();
    };
  }, [isGameFinished]);

  useEffect(() => {
    if (isGameFinished) return;

    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameFinished]);

  function handleClick(shapeValue) {
    if (!isPlaced(shapeValue)) {
      setDropped((prev) => ({
        ...prev,
        [shapeValue]: shapeValue,
      }));
      setClicked((prev) => [...prev, shapeValue]);
    } else {
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 800);
    }
  }

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

  const isPlaced = (id) => dropped[id] === id;


   const [count, setCount] = useState(1);
      
        useEffect(() => {
          if (isGameFinished) return; 
      
          const interval = setInterval(() => {
            setCount((prev) => prev + 1);
          }, 1000);
      
          return () => clearInterval(interval); 
        }, [isGameFinished]);

        useEffect(() => {
    if (isGameFinished) return;

    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameFinished]);



    useEffect(() => {
    if (!isGameFinished || !childId) return;


    const data = {
      child_id: childId,
      game: "Shape",
      difficulty: "Hard",
      level: 1,
      time: count,
    };

    console.log("Saving progress:", data);

    api.post("/api/save_progress/", data)
      .then((res) => console.log("Progress saved:", res.data))
      .catch((err) => console.error("Error saving progress:", err));
  }, [isGameFinished]);




  return (
    <div className="absolute w-[100vw] h-[100vh] font-[coiny]">
      <img src={bg} alt="background" className="absolute w-full h-full" />
      <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>

      <img src={board} className="absolute h-83 w-180 z-10" />

      {numbers.map((num) => (
        <div
          key={num.value}
          className="absolute cursor-pointer"
          style={{ top: num.top, left: num.left }}
          onClick={() => handleClick(num.value)}
        >
          {!clicked.includes(num.value) && (
            <img
              src={num.img}
              style={{ width: num.width, height: num.height }}
              className="object-contain"
            />
          )}
        </div>
      ))}

      {showWrong && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <img src={wrongImage} alt="Wrong" className="h-[300px]" />
        </div>
      )}


  {/* Wrong Image*/}
  {showWrong && (
    <div className="absolute inset-0 flex items-center justify-center  z-30 pointer-events-none h-[100vh] w-[100vw]">
      <img
        src={wrongImage}
        alt="Wrong"
        className="h-[300px]"
      />
    </div>
  )}

    {/* Results */}
      {isGameFinished && count <= 10 && (
        <div className="absolute inset-0 flex items-center h-full w-full justify-center bg-opacity-50 z-20">
          <img src={ThreeStar} alt="Game Completed!" className="h-[300px] animate-bounce" />
          <div className="absolute bottom-[20%]">
            <ReplayNBack />
          </div>
        </div>
      )}

      {isGameFinished && count <= 15 && count > 10 && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
          <img src={TwoStar} alt="Game Completed!" className="h-[300px] animate-bounce" />
          <div className="absolute bottom-[20%]">
            <ReplayNBack />
          </div>
        </div>
      )}

      {isGameFinished && count > 15 && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
          <img src={OneStar} alt="Game Completed!" className="h-[300px] animate-bounce" />
          <div className="absolute bottom-[20%]">
            <ReplayNBack />
          </div>
        </div>
      )}
      

    </div>
  );
}

export default ShapesHardLevel1;
