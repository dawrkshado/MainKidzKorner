import Back from "../components/Back";
import TopBar from "../components/TopBar";
import React, { useState,useEffect } from "react";


import hardalphabutton1 from "../assets/Alphabets/hardalphabutton1.png";
import tutorialVideo from "../assets/videos/AlphabetHardTutorial.mp4"; // ✅ Add the tutorial video path here
import { motion, AnimatePresence } from "framer-motion";



import useSound from "use-sound";
import clickSfx from "../assets/Sounds/button_click.mp3";
import backgroundMusic from "../assets/Sounds/background.mp3";

import 'react-router-dom'



import { Link } from "react-router-dom";


const PROGRESS_KEY = "alphabetHardProgress";

const getProgress = () => {
  return (
    JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {
      level1: false,
    }
  );
};

const saveProgress = (newProgress) => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
};

function AlphabetHard() {
  const [progress, setProgress] = useState(getProgress());
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const [showTutorial, setShowTutorial] = useState(true);
  const handleVideoEnd = () => {
    setShowTutorial(false);
  
  const [playClick] = useSound(clickSfx, { volume: 0.5 });

  useEffect(() => {
    const bgSound = new Audio(backgroundMusic);
    bgSound.loop = true;
    bgSound.volume = 0.2;

    bgSound.play().catch((err) => {
      console.log("Autoplay blocked. Click required first.", err);
    });

    return () => {
      bgSound.pause();
      bgSound.currentTime = 0;
    };
  }, []);

  const handleResetConfirmed = () => {
    playClick();
    const resetState = { level1: false };
    setProgress(resetState);
    saveProgress(resetState);
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);

    setShowResetModal(false);
  };

  const promptReset = () => {
    playClick();
    setShowResetModal(true);
  };

  return (
    <>
      <div className="hidden w-full md:inline md:absolute h-auto">
  
        <Back />
        <AnimatePresence mode="wait">
        {showTutorial ? (
          // 🎬 Tutorial video plays first
          <motion.div
            key="tutorial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center w-full h-full"
          >
            <div className="relative w-[80%]">
              <video
                src={tutorialVideo}
                autoPlay
                onEnded={handleVideoEnd}
                className="rounded-2xl shadow-lg w-full border-4 border-gray-200"
              />
              <button
                onClick={handleVideoEnd}
                className="absolute top-4 right-4 bg-white/80 text-black font-semibold px-4 py-1 rounded-lg shadow hover:bg-white transition"
              >
                Skip
              </button>
            </div>
          </motion.div>
        ) : (
          // 🎮 After tutorial ends — show the Hard menu screen
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <div className="hidden w-full md:inline md:absolute h-auto">
              <TopBar />
              <Back />
              <img
                src="/Bg/Alphabets/alphabethardbg.webp"
                alt="Hard game background"
                className="w-full"
              />
              <Link to="/alphabets/hard/level1">
                <img
                  src={hardalphabutton1}
                  alt="Button to go to Level1"
                  className="absolute left-[42%] top-[54%] w-auto cursor-pointer h-auto"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* ✅ Reset Button */}
        <div className="absolute top-[5px] right-[50px] z-20">
          <button
            onClick={promptReset}
            className="bg-green-500 hover:bg-red-700 text-white py-2 px-4 rounded-full shadow-lg transition duration-150 ease-in-out transform hover:scale-105"
            title="Reset Hard Level Progress"
          >
            🔄 Reset Game
          </button>
        </div>

        {/* ✅ Background */}
        <img
          src="./Bg/Alphabets/alphabethardbg.webp"
          alt="Hard Level Menu"
          className="w-full"
        />

        {/* ✅ Level 1 */}
        <Link to="/alphabets/hard/level1" onClick={playClick}>
          <img
            src={hardalphabutton1}
            alt="Level 1"
            className="absolute left-[42%] top-[54%] w-auto cursor-pointer h-auto"
          />

        </Link>

        {/* ✅ Green check when finished */}
        {progress.level1 && (
          <span
            className="absolute text-4xl font-bold text-green-500"
            style={{
              left: "55%",
              top: "58%",
              transform: "translate(-50%, -50%)",
            }}
          >
            ✅
          </span>
        )}

        {showResetModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full">
              <h2 className="text-xl text-green-600 mb-4">
                Reset Progress Confirmation
              </h2>
              <p className="mb-6 text-gray-700">
                Are you sure you want to reset Alphabet Hard progress?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetConfirmed}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccessToast && (
          <div className="fixed top-20 right-5 z-50">
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-xl flex items-center space-x-3">
              <span className="text-2xl">🎉</span>
              <p>Alphabet Hard progress has been reset!</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}



}

export default AlphabetHard;


