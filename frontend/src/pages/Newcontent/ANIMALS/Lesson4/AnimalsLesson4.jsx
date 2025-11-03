import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import act1live from "../../../../assets/Animals/act1live.webp";
import act2live from "../../../../assets/Animals/act2live.webp";
import exerciselive from "../../../../assets/Animals/exerciselive.webp";
import activitylive from "../../../../assets/Animals/activitylive.webp";

import bearbutton from "../../../../assets/Animals/ExerciseHabitats/bearbutton.webp";
import camelbutton from "../../../../assets/Animals/ExerciseHabitats/camelbutton.webp";
import frogbutton from "../../../../assets/Animals/ExerciseHabitats/frogbutton.webp";
import lionbutton from "../../../../assets/Animals/ExerciseHabitats/lionbutton.webp";
import monkeybutton from "../../../../assets/Animals/ExerciseHabitats/monkeybutton.webp";

import habitatsbg from "../../../../assets/Animals/ExerciseHabitats/habitatsbg.webp";
import arcticbg from "../../../../assets/Animals/ExerciseHabitats/arcticbg.webp";
import desertbg from "../../../../assets/Animals/ExerciseHabitats/desertbg.webp";
import forestbg from "../../../../assets/Animals/ExerciseHabitats/forestbg.webp";
import pondbg from "../../../../assets/Animals/ExerciseHabitats/pondbg.webp";
import savannabg from "../../../../assets/Animals/ExerciseHabitats/savannabg.webp";

import animalhabitatvid from "../../../../assets/Animals/ExerciseVideo/animalhabitatvid.mp4";

function AnimalLesson4() {
  const [clicked, setClicked] = useState(false);
  const [clickedID, setClickedID] = useState(null);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  function stopVideo() {
    if (videoRef.current) videoRef.current.pause();
  }

  function handleClick(buttonId) {
    stopVideo(); // stop video on popup open
    setClicked(true);
    setClickedID(buttonId);
  }

   const handleExit = () => {
    setClicked(false);
    setClickedID(null);

    // Resume main video when closing popup
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  function getBackgroundForId(id) {
    if (id === "lion") return savannabg;
    if (id === "bear") return arcticbg;
    if (id === "frog") return pondbg;
    if (id === "camel") return desertbg;
    if (id === "monkey") return forestbg;
    return habitatsbg;
  }

  const overlayStyle = {
    backgroundImage: clicked && clickedID ? `url(${getBackgroundForId(clickedID)})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 50,
    display: clicked ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <div className="relative w-full min-h-screen overflow-y-auto">
        {/* Main background */}
        <img
          src="/Bg/mainvidbg.webp"
          alt="Main background"
          className="w-full h-auto block"
        />

        {/* Animal habitat video */}
        <div className="absolute top-[10%] left-[30%] transform -translate-x-1/2 w-[48%]">
          <video
            ref={videoRef}
            src={animalhabitatvid}
            controls
            autoPlay
            loop
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* Exercises & Activities buttons */}
        <div
          onClick={() => handleClick("Exercises")}
          className="hover:cursor-pointer absolute left-[62%] top-[17%] motion-preset-pulse-sm motion-duration-2000"
        >
          <img
            src={exerciselive}
            alt="Exercises Button"
            className="w-auto h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div
          onClick={() => handleClick("Activities")}
          className="hover:cursor-pointer absolute left-[62%] top-[43%] motion-preset-pulse-sm motion-duration-2000"
        >
          <img
            src={activitylive}
            alt="Activities Button"
            className="w-auto h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Exercise/Activities popup */}
      {clicked && (
        <div style={overlayStyle}>
          {/* Exit button */}
          <div
            onClick={handleExit}
            className="bg-red-600 absolute right-[3%] top-[3%] h-10 w-10 rounded-4xl flex justify-center items-center hover:cursor-pointer"
          >
            <p className="text-white">X</p>
          </div>

          {/* Exercises */}
          {clickedID === "Exercises" && (
            <div className="flex flex-wrap justify-center gap-15">
              {[lionbutton, bearbutton, frogbutton, camelbutton, monkeybutton].map((btn, i) => (
                <img
                  key={i}
                  src={btn}
                  alt={`Animal ${i}`}
                  onClick={() => {
                    stopVideo(); // stop video on button click
                    setClickedID(["lion", "bear", "frog", "camel", "monkey"][i]);
                  }}
                  className="w-60 h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              ))}
            </div>
          )}

          {/* Activities */}
          {clickedID === "Activities" && (
            <div className="flex flex-col items-center gap-10">
              <img
                src={act1live}
                alt="Activity 1"
                onClick={() => {
                  stopVideo(); // stop video before navigating
                  navigate("/lessons/animals/lesson4/activity1");
                }}
                className="w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
              <img
                src={act2live}
                alt="Activity 2"
                onClick={() => {
                  stopVideo(); // stop video before navigating
                  navigate("/lessons/animals/lesson4/activity2");
                }}
                className="w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AnimalLesson4;
