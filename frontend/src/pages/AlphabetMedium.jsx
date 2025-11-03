


import Back from "../components/Back";
import medalphabutton1 from "../assets/Alphabets/medalphabutton1.png";
import medalphabutton2 from "../assets/Alphabets/medalphabutton2.png";


import { useState,useEffect } from "react";
import backgroundMusic from "../assets/Sounds/background.mp3"; 
import useSound from 'use-sound';
import clickSfx from '../assets/Sounds/button_click.mp3'; 

import tutorialVideo from "../assets/videos/AlphabetMediumTutorial.mp4"; // ✅ Video path
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const PROGRESS_KEY = 'alphabetMediumProgress'; 

const getProgress = () => {
 return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {
 level1: false, 
 level2: false, 
 };
};

const saveProgress = (newProgress) => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
};


function AlphabetMedium() {
    
 const [playClick] = useSound(clickSfx, { volume: 0.5 });
const [progress, setProgress] = useState(getProgress());

    const [showResetModal, setShowResetModal] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

 useEffect(() => {
setProgress(getProgress());

 const handleVisibilityChange = () => {
 if (document.visibilityState === 'visible') {
setProgress(getProgress());
 }
 };

 window.addEventListener('focus', handleVisibilityChange);
 return () => window.removeEventListener('focus', handleVisibilityChange);
}, []);

 useEffect(() => {
const bgSound = new Audio(backgroundMusic);
 bgSound.loop = true;
 bgSound.volume = 0.2; 

 bgSound.play().catch((err) => {
 console.log("Autoplay blocked. User must interact to enable sound.", err);
 });

return () => {
bgSound.pause();
 bgSound.currentTime = 0;
 };
 }, []); 


const handleResetConfirmed = () => {
    setShowResetModal(false);
    playClick();

    const resetState = {
        level1: false,
        level2: false,
    };

    setProgress(resetState);
    saveProgress(resetState); 
    setShowSuccessToast(true);

    setTimeout(() => {
        setShowSuccessToast(false);
    }, 3000); 
};

const promptReset = () => {
    playClick(); 
    setShowResetModal(true); 
};


const levels = [
 { id: "level1", image: medalphabutton1, path: "/alphabets/medium/level1", left: "30%", top: "50%" }, 
 { id: "level2", image: medalphabutton2, path: "/alphabets/medium/level2", left: "67%", top: "50%" }, 
];
const isUnlocked = (index) => {
if (index === 0) return true; 


const previousLevelId = levels[index - 1].id; 

return progress[previousLevelId] === true; 
};

 const renderLevelButton = (lvl, index) => {
const unlocked = isUnlocked(index);
 const isCompleted = progress[lvl.id]; 


 const baseClasses = `absolute w-auto h-auto left-[${lvl.left}] top-[${lvl.top}]`;
 const imageClasses = "w-full h-full";

 if (unlocked) {
 return (
<Link 
 to={lvl.path} 
 onClick={playClick} 
 key={lvl.id}
className={`${baseClasses} cursor-pointer`}
 >
 <img 
 src={lvl.image} 
 alt={`Button to go to ${lvl.id}`} 
 className={imageClasses}
 />
 {isCompleted && (
 <span className="absolute text-4xl font-bold text-green-500 z-10"
 style={{ 
 left: '50%', 
 top: '50%', 
 transform: 'translate(-50%, -50%)',
 textShadow: '0 0 5px black'
 }}>
 ✅
 </span>
 )}
</Link>
);
 } else {
 return (
 <div 
 key={lvl.id} 
 onClick={() => { playClick(); console.log(`Complete Level ${index + 1} to unlock Level ${index + 2}!`); }}

 className={`${baseClasses} opacity-40 cursor-not-allowed`}
 >
 <img 
 src={lvl.image} 
alt={`${lvl.id} is locked`} 
className={imageClasses}
/>
 <span className="absolute text-4xl font-bold text-gray-700"
 style={{ 
 left: '50%', 
top: '50%', 
 transform: 'translate(-50%, -50%)',
 textShadow: '0 0 5px white' 
}}>
🔒
</span>
</div>
);
 }
 };

  const [showTutorial, setShowTutorial] = useState(true);

  const handleVideoEnd = () => {
    setShowTutorial(false);
  };

  return (
    <div className="relative w-full h-screen bg-green-100 overflow-hidden">
            <div className="absolute top-[5px] right-[50px] z-20"> 
                <button 
                    onClick={promptReset} 
                    className="bg-green-500 hover:bg-red-700 text-white py-2 px-4 rounded-full shadow-lg transition duration-150 ease-in-out transform hover:scale-105"
                    title="Reset all level progress"
                >
                    🔄Reset Game
                </button>
            </div>

            {levels.map((lvl, index) => renderLevelButton(lvl, index))}

            {showResetModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full transform transition-all scale-100 duration-300">
                    <h2 className="text-xl text-green-600 mb-4">Reset Game Confirmation</h2>
                    <p className="mb-6 text-gray-700">
                        Are you sure you want to reset the game?
                    </p>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => { setShowResetModal(false); playClick(); }}
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
                    <div className="bg-green-500 text-white p-4 rounded-lg shadow-xl flex items-center space-x-3 transition-opacity duration-300">
                        <span className="text-2xl">🎉</span>
                        <p> Alphabet Medium progress has been reset!</p>
                    </div>
                </div>
            )}

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
          // 🎮 After video ends — show the AlphabetMedium menu
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
                src="/Bg/Alphabets/alphabetmediumbg.webp"
                alt="Medium game background"
                className="w-full"
              />

              <Link to="/alphabets/medium/level1">
                <img
                  src={medalphabutton1}
                  alt="Button to go to Level1"
                  className="absolute left-[29%] top-[54%] w-auto cursor-pointer h-auto"
                />
              </Link>
              <Link to="/alphabets/medium/level2">
                <img
                  src={medalphabutton2}
                  alt="Button to go to Level2"
                  className="absolute left-[67%] top-[65%] w-auto cursor-pointer h-auto"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

}

export default AlphabetMedium;