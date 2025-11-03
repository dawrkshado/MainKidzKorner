import React, { useState } from "react";
import { Link } from "react-router-dom";  // if you need links
import Back from "../components/Back";

import easyalphabutton1 from "../assets/Alphabets/easyalphabutton1.png";
import easyalphabutton2 from "../assets/Alphabets/easyalphabutton2.png";
import easyalphabutton3 from "../assets/Alphabets/easyalphabutton3.png";

// Import the tutorial video
import tutorialVideo from "../assets/videos/AlphabetEasyTutorial.mp4";

function AlphabetEasy() {
  const [showTutorial, setShowTutorial] = useState(true);

  const handleVideoEnd = () => {
    setShowTutorial(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      { showTutorial ? (
        <div className="flex justify-center items-center w-full h-full bg-black">
          <video
            src={tutorialVideo}
            autoPlay
            muted              // helps with autoplay restrictions
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-auto"
          >
            Your browser does not support the video tag.
          </video>
          <button
            onClick={handleVideoEnd}
            className="absolute top-4 right-4 bg-white/80 text-black px-4 py-1 rounded-lg"
          >
            Skip
          </button>
        </div>
      ) : (
        <div className="hidden w-full md:inline md:absolute h-auto">
          <Back />
          <img
            src="./Bg/Alphabets/alphabetsabcd.webp"
            alt="ABCD Background"
            className="w-full"
          />
          <Link to="/alphabets/easy/level1">
            <img
              src={easyalphabutton1}
              alt="Button to go to Level1"
              className="absolute left-[40%] top-[70%] cursor-pointer"
            />
          </Link>
          <Link to="/alphab ets/easy/level2">
            <img
              src={easyalphabutton2}
              alt="Button to go to Level2"
              className="absolute left-[55%] top-[48%] cursor-pointer"
            />
          </Link>
          <Link to="/alphabets/easy/level3">
            <img
              src={easyalphabutton3}
              alt="Button to go to Level3"
              className="absolute left-[40%] top-[10%] cursor-pointer"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default AlphabetEasy;
