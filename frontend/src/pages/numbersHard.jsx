import React, { useState } from "react";
import Back from "../components/Back";
import { Link } from "react-router-dom";
import hardnumberbutton1 from "../assets/Number/hardnumberbutton1.png";
import tutorialVideo from "../assets/videos/NumberHardTutorial.mp4";
import { motion, AnimatePresence } from "framer-motion";

function NumberHard() {
  const [showTutorial, setShowTutorial] = useState(true);

  const handleVideoEnd = () => {
    setShowTutorial(false);
  };

  return (
    <div className="relative w-full h-screen bg-green-100 overflow-hidden">
      <AnimatePresence mode="wait">
        {showTutorial ? (
          // 🎬 Tutorial video section
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
          // 🟢 Main Hard Number Game Menu
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <div className="hidden w-full md:inline md:absolute h-auto">
              <Back />
              <img
                src="/Bg/Number/hardnumberbg.png"
                alt="Hard number game background"
                className="w-full"
              />

              <Link to="/number/hard/level1">
                <img
                  src={hardnumberbutton1}
                  alt="Button for Level 1 Number"
                  className="absolute left-[50%] top-[50%] w-auto cursor-pointer h-auto"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NumberHard;
