import { useState,useEffect } from "react"
import red from "../assets/Color/Easy/red.webp";
import yellow from "../assets/Color/Easy/yellow.webp";
import bg from "../assets/Color/Easy/bg1.webp";

import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 

import ReplayNBack from "../components/ReplayNBack";

import backgroundMusic from "../assets/Sounds/background.mp3";

import { motion } from "framer-motion";

import applause from "../assets/Sounds/applause.wav"
import { useWithSound } from "../components/useWithSound";
import { useNavigate } from "react-router-dom";

function ShapesEasyLevel1() {
   const navigate = useNavigate();
  const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause); 
  const clickables = [
    {
      Answer: "red",
      choices: [
        { value: "red", img: red },
        { value: "yellow", img: yellow },

      ]
    }
  ];

  const [isGameFinished,setGameFinished]= useState(false);
  
    const [count, setCount] = useState(0);
          
            useEffect(() => {
              if (isGameFinished) return; 
          
              const interval = setInterval(() => {
                setCount((prev) => prev + 1);
              }, 1000);
          
              return () => clearInterval(interval); 
            }, [isGameFinished]);
    
  

  const [index] = useState(0);

  const logic = (choice) => {
    if (choice === clickables[index].Answer) {
      setGameFinished(true);
    } else {
      alert("wrong!");
    }
  };
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
  
 
  function handleDragEnd(event) {
    if (event.over && event.active.id === event.over.id) { 
      const draggedId = event.active.id;
      const droppedId = event.over.id;

      setDropped((prev) => ({
        ...prev,
        [draggedId]: droppedId,
      }));
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

  const isPlaced= (id) => dropped[id] === id;

  return (
    <>

    <div className="font-[coiny]">
    <img src={bg} alt="background" className="w-full "/>

       <div className="absolute top-0 right-0 text-white">Your Time: {count}</div>

      <div className="flex justify-evenly justify-self-center w-150 gap-20 absolute top-55 right-35">

        {clickables[index].choices.map((choice, i) => (
          <img
            key={i}
            onClick={() => logic(choice.value)}
            className="h-100  cursor-pointer"
            src={choice.img}
            alt={choice.value}
          />
        ))}
      </div>

    {/*Results*/}
        {isGameFinished && count <= 10 &&(
          <div className="absolute inset-0 flex items-center h-full w-full justify-center bg-opacity-50 z-20  ">
             <motion.img
               src={ThreeStar}
               alt="Game Completed!"
               className="h-[300px]"
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
            />

            <div className="absolute bottom-[20%] ">
                <ReplayNBack/>
            </div>

     
          </div>
        )}


    {isGameFinished && count <= 15 && count > 10 &&(
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
             <motion.img
               src={TwoStar}
               alt="Game Completed!"
               className="h-[300px]"
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
          />
             <div className="absolute bottom-[20%] ">
                <ReplayNBack/>
            </div>
        </div>
    )}

    {isGameFinished && count > 15 &&(
    <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
       <motion.img
         src={OneStar}
         alt="Game Completed!"
         className="h-[300px]"
         initial={{ scale: 0, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
    />
            <div className="absolute bottom-[20%] ">
                <ReplayNBack/>
            </div>
    </div>
    )}

    </div>
    </>
  );
}

export default ShapesEasyLevel1;
