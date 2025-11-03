import { useState,useEffect } from "react";
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core";

import draggableNumber1 from "../assets/Number/Hard/draggable1.webp"
import draggableNumber2 from "../assets/Number/Hard/draggable2.webp"
import draggableNumber3 from "../assets/Number/Hard/draggable3.webp"
import draggableNumber4 from "../assets/Number/Hard/draggable4.webp"
import draggableNumber5 from "../assets/Number/Hard/draggable5.webp"
import draggableNumber6 from "../assets/Number/Hard/draggable6.webp"
import draggableNumber7 from "../assets/Number/Hard/draggable7.webp"
import draggableNumber8 from "../assets/Number/Hard/draggable8.webp"
import draggableNumber9 from "../assets/Number/Hard/draggable9.webp"
import draggableNumber10 from "../assets/Number/Hard/draggable10.webp"

import droppablefish1 from "../assets/Number/Hard/droppable1.webp"
import droppablefish2 from "../assets/Number/Hard/droppable2.webp"
import droppablefish3 from "../assets/Number/Hard/droppable3.webp"
import droppablefish4 from "../assets/Number/Hard/droppable4.webp"
import droppablefish5 from "../assets/Number/Hard/droppable5.webp"
import droppablefish6 from "../assets/Number/Hard/droppable6.webp"
import droppablefish7 from "../assets/Number/Hard/droppable7.webp"
import droppablefish8 from "../assets/Number/Hard/droppable8.webp"
import droppablefish9 from "../assets/Number/Hard/droppable9.webp"
import droppablefish10 from "../assets/Number/Hard/droppable10.webp"


import OneStar from "../assets/Done/OneStar.webp"; 
import TwoStar from "../assets/Done/TwoStar.webp"; 
import ThreeStar from "../assets/Done/ThreeStar.webp"; 

import Back from "../components/Back";
import Restart from "../components/Restart";

import bg from "../assets/Number/Hard/bg.webp";

import backgroundMusic from "../assets/Sounds/background.mp3";

import applause from "../assets/Sounds/applause.wav"
import { useWithSound } from "../components/useWithSound";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
    

function Droppable({ id, placedShape, shape }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    opacity: isOver ? "0.5" : "1",
    zIndex: isOver ? "10" : "1"
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-center h-[160px] w-[160px]"
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

function NumberGameHard() {
  const [dropped, setDropped] = useState({});
    const { playSound: playApplause, stopSound: stopApplause } = useWithSound(applause);
  

  function handleDragEnd(event) {
    if (event.over) {
      const draggedId = event.active.id;
      const droppedId = event.over.id;

      if (draggedId === droppedId) {
        setDropped((prev) => ({
          ...prev,
          [draggedId]: droppedId,
        }));
      }
    }
}

const isGameFinished =
    dropped["one"] && dropped["two"] && dropped["three"]&& dropped["four"]&& dropped["five"]&& dropped["six"]
    && dropped["seven"]&& dropped["eight"]&& dropped["nine"]&& dropped["ten"];

   const [count, setCount] = useState(0);

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
    <>
      <div className="flex h-[100vh] w-[100vw] absolute font-[coiny] text-white bg-cover bg-no-repeat bg-left" style={{backgroundImage:`url(${bg})`}}>
        <div className="absolute top-0 right-0">Your Time: {count}</div>
        <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
          {/* Draggables */}

          <div className="z-1 flex">
              {!dropped["one"] && (
            <div className="absolute bottom-40 left-[400px]">
              <Draggable
                id="one"
                shape={<img src={draggableNumber1} alt="number 1" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

          {!dropped["two"] && (
            <div className="absolute bottom-20 left-[175px] ">
              <Draggable
                id="two"
                shape={<img src={draggableNumber2} alt="number 4" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

          {!dropped["three"] && (
            <div className="absolute bottom-20 left-[320px]">
              <Draggable
                id="three"
                shape={<img src={draggableNumber3} alt="number 5" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

           {!dropped["four"] && (
            <div className="absolute bottom-20 left-[460px]">
              <Draggable
                id="four"
                shape={<img src={draggableNumber4} alt="number 8" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

          {!dropped["five"] && (
            <div className="absolute bottom-20 left-[35px] ">
              <Draggable
                id="five"
                shape={<img src={draggableNumber5} alt="number 4" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

  {!dropped["six"] && (
            <div className="absolute bottom-20 right-[35px]">
              <Draggable
                id="six"
                shape={<img src={draggableNumber6} alt="number 1" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

          {!dropped["seven"] && (
            <div className="absolute bottom-20 right-[175px] ">
              <Draggable
                id="seven"
                shape={<img src={draggableNumber7} alt="number 4" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

          {!dropped["eight"] && (
            <div className="absolute bottom-20 right-[320px]">
              <Draggable
                id="eight"
                shape={<img src={draggableNumber8} alt="number 5" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

           {!dropped["nine"] && (
            <div className="absolute bottom-20 right-[460px]">
              <Draggable
                id="nine"
                shape={<img src={draggableNumber9} alt="number 8" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}

          {!dropped["ten"] && (
            <div className="absolute bottom-40 right-[400px]">
              <Draggable
                id="ten"
                shape={<img src={draggableNumber10} alt="number 4" className="h-[60px] motion-preset-pulse-sm motion-duration-2000" />}
              />
            </div>
          )}</div>
        

          {/* Droppables */}
          <div className="absolute h-90 w-full gap-6 top-12 z-0 ">
            <div className="flex justify-evenly w-full">
               <div className="top-35 left-100 motion-preset-pulse-sm motion-duration-2000">
                  <Droppable
                  id="four"
                  shape={<img src={droppablefish4} alt="fish image" />}
                  placedShape={
                    dropped["four"] && (
                      <Draggable
                        id="four"
                        disabled={true}/>)}/>
                </div>
            
              <div className="left-220 top-35 motion-preset-pulse-sm motion-duration-2000">
                <Droppable
                id="six"
                shape={<img src={droppablefish6} alt="fish image" />}
                placedShape={
                  dropped["six"] && (
                    <Draggable
                      id="six"
                      disabled={true}/>)}/>
              </div>

            <div className="top-35 left-100 motion-preset-pulse-sm motion-duration-2000">
              <Droppable
              id="nine"
              shape={<img src={droppablefish9} alt="fish image" />}
              placedShape={
                dropped["nine"] && (
                  <Draggable
                    id="nine"
                    disabled={true}/>)}/>
            </div>
            
              <div className="left-220 top-35 motion-preset-pulse-sm motion-duration-2000">
                  <Droppable
                id="five"
                shape={<img src={droppablefish5} alt="fish image" />}
                placedShape={
                  dropped["five"] && (
                    <Draggable
                      id="five"
                      disabled={true}/>)}/>
              </div>


              
            <div className="top-35 left-100 motion-preset-pulse-sm motion-duration-2000">
              <Droppable
              id="ten"
              shape={<img src={droppablefish10} alt="fish image" />}
              placedShape={
                dropped["ten"] && (
                  <Draggable
                    id="ten"
                    disabled={true}/> ) } />
            </div>
            </div>

          
            <div className="flex w-full  justify-evenly">
               <div className="left-220 top-35 motion-preset-pulse-sm motion-duration-2000">
                <Droppable
              id="two"
              shape={<img src={droppablefish2} alt="fish image" />}
              placedShape={
                dropped["two"] && (
                  <Draggable
                    id="two"
                    disabled={true}/> ) } />
              </div>

            <div className="top-35 left-100 motion-preset-pulse-sm motion-duration-2000">
              <Droppable
              id="one"
              shape={<img src={droppablefish1} alt="fish image" />}
              placedShape={
                dropped["one"] && (
                  <Draggable
                    id="one"
                    disabled={true}/>)}/>
            </div>
            
              <div className="left-220 top-35 motion-preset-pulse-sm motion-duration-2000">
                  <Droppable
                    id="three"
                    shape={<img src={droppablefish3} alt="fish image" />}
                    placedShape={
                      dropped["three"] && (
                        <Draggable
                          id="three"
                          disabled={true}/>)}/>
              </div>

                <div className="top-35 left-100 motion-preset-pulse-sm motion-duration-2000">
              <Droppable
              id="seven"
              shape={<img src={droppablefish7} alt="fish image" />}
              placedShape={
                dropped["seven"] && (
                  <Draggable
                    id="seven"
                    disabled={true}/>)}/>
            </div>
            
              <div className="left-220 top-35 motion-preset-pulse-sm motion-duration-2000">
                <Droppable
              id="eight"
              shape={<img src={droppablefish8} alt="fish image" />}
              placedShape={
                dropped["eight"] && (
                  <Draggable
                    id="eight"
                    disabled={true}/> ) } />
              </div>
           
            </div>
          </div>
        </DndContext>

        
     {/*Results*/}
        {isGameFinished && count < 10 && count <= 20  &&(
          <div className="absolute inset-0 flex items-center h-full w-full justify-center bg-opacity-50 z-20  ">
              <motion.img
                         src={ThreeStar}
                         alt="Game Completed!"
                         className="h-[300px]"
                         initial={{ scale: 0, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ duration: 0.8, ease: "easeOut" }}
            />

            <div  className="absolute bottom-35 gap-20 flex h-25  w-50 ">
               <div>
              <Back/>
            </div>

            <div>
               <Restart/>
            </div>
          </div>
          </div>
        )}

    {isGameFinished && count >= 20 && count <= 30 &&(
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
         <motion.img
                         src={TwoStar}
                         alt="Game Completed!"
                         className="h-[300px]"
                         initial={{ scale: 0, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ duration: 0.8, ease: "easeOut" }}
            />

            <div  className="absolute bottom-35 gap-20 flex h-25  w-50 ">
               <div>
              <Back/>
            </div>

            <div>
               <Restart/>
            </div>

          </div>
        </div>
    )}

    {isGameFinished && count > 30 &&(
    <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-20">
   <motion.img
                         src={OneStar}
                         alt="Game Completed!"
                         className="h-[300px]"
                         initial={{ scale: 0, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ duration: 0.8, ease: "easeOut" }}
            />

            <div  className="absolute bottom-35 gap-20 flex h-25  w-50 ">
               <div>
              <Back/>
            </div>

            <div>
               <Restart/>
            </div>

          </div>
    </div>
    )}
      </div>
    </>
  );
}

export default NumberGameHard;
