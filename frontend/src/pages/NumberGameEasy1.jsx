import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added for better navigation control
import useSound from 'use-sound';
import { motion } from "framer-motion";
import { useWithSound } from "../components/useWithSound";
import bg from "../assets/Number/Easy/bglvl2.webp";
import wrongImage from "../assets/Alphabets/Hard/cross.gif" 
import one from "../assets/Number/Easy/One.webp";
import two from "../assets/Number/Easy/Two.webp";
import three from "../assets/Number/Easy/three.webp";
import four from "../assets/Number/Easy/four.webp";
import five from "../assets/Number/Easy/five.webp";
import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 
import ReplayNBack from "../components/ReplayNBack";
import backgroundMusic from "../assets/Sounds/background.mp3";
import applause from "../assets/Sounds/applause.wav"
import clickSfx from '../assets/Sounds/wrong_effect.mp3'; 

function saveProgress(level) {
  const progress = JSON.parse(localStorage.getItem("numberEasyProgress")) || {
    level1: false,
    level2: false,
    level3: false,

  };
  progress[level] = true;
  localStorage.setItem("numberEasyProgress", JSON.stringify(progress));
}

function NumberGameEasy1 () {
    const [playClick] = useSound(clickSfx, { volume: 0.5 });
    const navigate = useNavigate();
    
    const [clicked, setClicked] = useState([]);
    const [showWrong, setShowWrong] = useState(false);
    const [count, setCount] = useState(0); 
    const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);
    

    const numbers = [
      { value: 1, img: one, top: 575, left: 395, width: 35, height: 35 },
      { value: 2, img: two, top: 450, left: 250, width: 25, height: 25 },
      { value: 3, img: three, top: 60, left: 70, width: 40, height: 40 },
      { value: 4, img: four, top: 80, left: 1090, width: 45, height: 45 },
      { value: 5, img: five, top: 490, left: 1150, width: 40, height: 40},
    ];

    const isGameFinished = clicked.length === numbers.length;

    const nextExpectedValue = clicked.length + 1;

    const triggerWrongClick = () => {
        playClick();
        setShowWrong(true);
        setTimeout(() => setShowWrong(false), 800);
    };

    const handleBackgroundClick = () => {
        if (!isGameFinished) {
            triggerWrongClick();
        }
    };

    const handleClick = (itemValue, e) => {
        e.stopPropagation();
        
        if (isGameFinished || clicked.includes(itemValue)) return;
        
        if (itemValue === nextExpectedValue) {
            setClicked([...clicked, itemValue]);
        } else {
            triggerWrongClick();
        }
    };

    const resetGame = () => {
        setClicked([]);
        setCount(0);
        stopApplause(); 
        navigate(0);
    };

    useEffect(() => {
        if (isGameFinished) return;

        const interval = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isGameFinished]);

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

    return (
      <div className="absolute w-[100vw] h-[100vh] font-[coiny] overflow-hidden" onClick={handleBackgroundClick}>
        <img src={bg} alt="background" className="absolute w-full h-full object-cover" />
        
        <div className="absolute top-4 right-4 text-white text-3xl z-10">Time: {count}s</div>

        {numbers.map((num, i) => (
          <div
            key={i}
            className={`absolute cursor-pointer transition-transform duration-300 ${num.value === nextExpectedValue && !isGameFinished ? 'motion-safe:animate-pulse' : ''}`}
            style={{ 
                top: `${num.top / 12}vh`, 
                left: `${num.left / 12}vw`,
            }}
            onClick={(e) => handleClick(num.value, e)}
          >
            {!clicked.includes(num.value) && (
              <img
                src={num.img}
                alt={`Number ${num.value}`}
                style={{ width: `${num.width / 1.5}vw`, height: `${num.height / 1.5}vh` }} // Adjusted sizing for better view
                className="object-contain"
              />
            )}
            
          </div>
        ))}

        {showWrong && (
          <motion.div 
             className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.1 }}
          >
            <img src={wrongImage} alt="Wrong" className="h-[300px]" />
          </motion.div>
        )}

        {isGameFinished && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-20">
            <motion.img
              src={count <= 10 ? ThreeStar : count <= 15 ? TwoStar : OneStar}
              alt="Game Completed!"
              className="h-[300px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <div className="absolute bottom-[20%]">
              <ReplayNBack onReplay={resetGame} /> 
            </div>
          </div>
        )}
      </div>
    );
}

export default NumberGameEasy1;