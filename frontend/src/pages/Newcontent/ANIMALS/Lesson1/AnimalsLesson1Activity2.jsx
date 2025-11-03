import { useState, useEffect } from "react";
import DuckShadow from "../../../../assets/Animals/Lesson2/DuckShadow.webp";
import PigShadow from "../../../../assets/Animals/Lesson2/PigShadow.webp";
import CatShadow from "../../../../assets/Animals/Lesson2/CatShadow.webp";
import CowShadow from "../../../../assets/Animals/Lesson2/CowShadow.webp";
import DogShadow from "../../../../assets/Animals/Lesson2/DogShadow.webp";
import bg from "../../../../assets/Animals/Lesson2/bg2.webp";
import catSound from "../../../../assets/Animals/Lesson2/catSound.mp3"
import cowSound from "../../../../assets/Animals/Lesson2/cowSound.mp3"
import dogSound from "../../../../assets/Animals/Lesson2/dogSound.mp3"
import pigSound from "../../../../assets/Animals/Lesson2/pigSound.mp3"
import duckSound from "../../../../assets/Animals/Lesson2/duckSound.mp3"

import { AnimatePresence } from "framer-motion";

import OneStar from "../../../../assets/Done/OneStar.webp";
import TwoStar from "../../../../assets/Done/TwoStar.webp";
import ThreeStar from "../../../../assets/Done/ThreeStar.webp";

import ReplayNBack from "../../../../components/ReplayNBack";

import { motion } from "framer-motion";
import { useWithSound } from "../../../../components/useWithSound";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import clickSfx from "../../../../assets/Sounds/wrong_effect.mp3";
import applause from "../../../../assets/Sounds/applause.wav";

import SoundTutorial from "../../../../assets/videos/SoundTutorial2.mp4"; 

import api from "../../../../api";

// Define rounds
const ROUNDS = [
  { shadow: DuckShadow, answer: "Duck", choices: ["Duck", "Dog", "Pig", "Cat"] },
  { shadow: PigShadow, answer: "Pig", choices: ["Cat", "Cow", "Pig", "Duck"] },
  { shadow: CatShadow, answer: "Cat", choices: ["Cat", "Cow", "Dog", "Duck"] },
  { shadow: CowShadow, answer: "Cow", choices: ["Pig", "Cow", "Dog", "Duck"] },
  { shadow: DogShadow, answer: "Dog", choices: ["Dog", "Cat", "Duck", "Pig"] },
];


function AnimalsLesson1Activity2() {
  const [playClick] = useSound(clickSfx, { volume: 0.5 });
  const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);

    const selectedChild = JSON.parse(localStorage.getItem("selectedChild"));
  const childId = selectedChild?.id; // this is the child ID you need


  // 🔊 add animal sounds
  const [playCat] = useSound(catSound, { volume: 0.7 });
  const [playCow] = useSound(cowSound, { volume: 0.7 });
  const [playDog] = useSound(dogSound, { volume: 0.7 });
  const [playPig] = useSound(pigSound, { volume: 0.9 });
  const [playDuck] = useSound(duckSound, { volume: 0.7 });

  const [roundIndex, setRoundIndex] = useState(0);
  const [isGameFinished, setGameFinished] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [count, setCount] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const handleVideoEnd = () => setShowTutorial(false);
  const handleSkip = () => setShowTutorial(false);
  const currentRound = ROUNDS[roundIndex];


  // ✅ play sound based on current round
  const handleShadowClick = () => {
    const animal = currentRound.answer.toLowerCase();
    if (animal === "cat") playCat();
    if (animal === "cow") playCow();
    if (animal === "dog") playDog();
    if (animal === "pig") playPig();
    if (animal === "duck") playDuck();
  };

 

  useEffect(() => {
      if (showTutorial) return;  // don’t count time during tutorial
      if (isGameFinished) return;
      const interval = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }, [isGameFinished, showTutorial]);

  const handleChoice = (choice) => {
    if (choice === currentRound.answer) {
      if (roundIndex + 1 >= ROUNDS.length) {
        setGameFinished(true);
        playApplause();
      } else {
        setRoundIndex(roundIndex + 1);
        setShowWrong(false);
      }
    } else {
      playClick();
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 800);
    }
  };

   useEffect(() => {
    if (isGameFinished) {
      localStorage.setItem("lesson1Activity2Done", "true");
    }
  }, [isGameFinished]);

    useEffect(() => {
  if (isGameFinished && childId) {
    const saveRecord = async () => {
      const payload = {
        child_id: childId,
        game: "Lesson1 Activity2",
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


  return (<>

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
    <div
      className="font-[coiny] h-[100vh] w-[100vw] bg-cover bg-no-repeat flex flex-col items-center justify-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {!isGameFinished && (
        <>
          <div className="absolute top-0 right-0 text-white text-xl">Time: {count}</div>

          {/* ✅ Clickable silhouette with sound */}
          <div className="flex justify-center mb-10">
            <img
              src={currentRound.shadow}
              alt="Animal Shadow"
              className="h-[300px] object-contain cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={handleShadowClick}
            />
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            {currentRound.choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handleChoice(choice)}
                className={`px-6 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition ${
                  showWrong && choice !== currentRound.answer ? "animate-shake bg-red-300" : ""
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
        </>
      )}

      {isGameFinished && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50">
          <motion.img
            src={count <= 10 ? ThreeStar : count <= 15 ? TwoStar : OneStar}
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
    </div>
  </>);
}

export default AnimalsLesson1Activity2;
