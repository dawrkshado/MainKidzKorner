import Back from "../components/Back";
import easyalphabutton1 from "../assets/Alphabets/easyalphabutton1.png";
import easyalphabutton2 from "../assets/Alphabets/easyalphabutton2.png";
import easyalphabutton3 from "../assets/Alphabets/easyalphabutton3.png";
import tutorialVideo from "../assets/videos/AlphabetEasyTutorial.mp4"; 
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import useSound from "use-sound";
import clickSfx from "../assets/Sounds/button_click_sound.mp3";
import { useState, useEffect } from "react";
import backgroundMusic from "../assets/Sounds/background.mp3";

function AlphabetEasy() {
  const [showTutorial, setShowTutorial] = useState(true);
  const [playClick] = useSound(clickSfx, { volume: 0.5 });
  const [bgSound] = useState(() => new Audio(backgroundMusic));

  // 🎵 Play background music when the tutorial starts
  useEffect(() => {
    bgSound.loop = true;
    bgSound.volume = 0.2;

    // Try to play audio when tutorial starts
    if (showTutorial) {
      bgSound
        .play()
        .catch((err) =>
          console.log("Autoplay blocked, user must interact first:", err)
        );
    }

    // Stop the music when the component unmounts
    return () => {
      bgSound.pause();
      bgSound.currentTime = 0;
    };
  }, [showTutorial, bgSound]);

  const handleVideoEnd = () => {
    setShowTutorial(false);
    playClick();
  };

  const handleSkip = () => {
    setShowTutorial(false);
    playClick();
  };

  return (
    <div className="relative w-full h-screen bg-green-100 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showTutorial ? (
  
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
                onClick={handleSkip}
                className="absolute top-4 right-4 bg-white/80 text-black font-semibold px-4 py-1 rounded-lg shadow hover:bg-white transition"
              >
                Skip
              </button>
            </div>
          </motion.div>
        ) : (
          // 🟢 Menu after tutorial
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
                src="/Bg/Alphabets/alphabeteasybg.webp"
                alt="Easy game background"
                className="w-full"
              />

              <Link to={"/alphabets/easy/level1"} onClick={playClick}>
                <img
                  src={easyalphabutton1}
                  alt="Button for Level 1 Alphabet"
                  className="absolute left-[40%] top-[70%] w-auto cursor-pointer h-auto"
                />
              </Link>

              <Link to={"/alphabets/easy/level2"} onClick={playClick}>
                <img
                  src={easyalphabutton2}
                  alt="Button for Level 2 Alphabet"
                  className="absolute left-[55%] top-[48%] w-auto cursor-pointer h-auto"
                />
              </Link>

              <Link to={"/alphabets/easy/level3"} onClick={playClick}>
                <img
                  src={easyalphabutton3}
                  alt="Button for Level 3 Alphabet"
                  className="absolute left-[40%] top-[10%] w-auto cursor-pointer h-auto"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AlphabetEasy;

