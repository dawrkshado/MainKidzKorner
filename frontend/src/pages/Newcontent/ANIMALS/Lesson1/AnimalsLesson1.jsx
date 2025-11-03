import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import act1sound from "../../../../assets/Animals/act1sound.webp";
import act2sound from "../../../../assets/Animals/act2sound.webp";
import exercisesound from "../../../../assets/Animals/exercisesound.webp";
import activitysound from "../../../../assets/Animals/activitysound.webp";

import dogsound from "../../../../assets/Animals/ExerciseSound/dogsound.webp";
import catsound from "../../../../assets/Animals/ExerciseSound/catsound.webp";
import cowsound from "../../../../assets/Animals/ExerciseSound/cowsound.webp";
import ducksound from "../../../../assets/Animals/ExerciseSound/ducksound.webp";
import pigsound from "../../../../assets/Animals/ExerciseSound/pigsound.webp";

import dogbark from "../../../../assets/Sounds/dogbark.mp3";
import catmeow from "../../../../assets/Sounds/catmeow.mp3";
import cowmoo from "../../../../assets/Sounds/cowmoo.mp3";
import duckquack from "../../../../assets/Sounds/duckquack.mp3";
import pigoink from "../../../../assets/Sounds/pigoink.mp3";

import SoundVideo from "../../../../assets/Animals/ExerciseVideo/Animal Sounds Lesson 1.mp4";

function AnimalLesson1() {
  const [clicked, setClicked] = useState(false);
  const [clickedID, setClickedID] = useState(null);
  const currentAudioRef = useRef(null);
  const videoRef = useRef(null); // ✅ ref for main video
  const navigate = useNavigate();

  // 🎵 Stop currently playing sound
  const stopSound = () => {
    const audio = currentAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      currentAudioRef.current = null;
    }
  };

// 🎵 Play animal sounds (5 seconds only)
const playSound = (soundFile) => {
  stopSound(); // stop any previous sound
  const audio = new Audio(soundFile);
  currentAudioRef.current = audio;
  audio.volume = 1.0;
  audio.play().catch((err) => console.error("Audio error:", err));

  // Stop sound after 5 seconds
  const stopTimeout = setTimeout(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      currentAudioRef.current = null;
    }
  }, 5000);

  // Clear timeout if audio ends before 5 seconds
  audio.onended = () => {
    clearTimeout(stopTimeout);
    currentAudioRef.current = null;
  };
};

  const handleClick = (button) => {
    stopSound();
    setClicked(true);
    setClickedID(button);

    // Pause main video when opening popup
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleExit = () => {
    stopSound();
    setClicked(false);
    setClickedID(null);

    // Resume main video when closing popup
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleNavigation = (path) => {
    stopSound();
    navigate(path);
  };

  // 🎬 Set video volume to max after mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 1.0; // ✅ maximum volume
    }
  }, []);

  // Cleanup audio when leaving page
  useEffect(() => {
    return () => stopSound();
  }, []);

  return (
    <>
      {/* 🟢 Main Page Section */}
      <div className="relative w-full min-h-screen overflow-y-auto">
        {/* Background */}
        <img
          src="/Bg/mainvidbg.webp"
          alt="Main background"
          className="w-full h-auto block"
        />

        {/* 🎬 Main Video (with MAX volume) */}
        <div className="absolute top-[10%] left-[30%] transform -translate-x-1/2 w-[48%]">
          <video
            ref={videoRef}
            src={SoundVideo}
            controls
            autoPlay
            loop
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* 🟡 Buttons */}
        <div
          onClick={() => handleClick("Exercises")}
          className="hover:cursor-pointer absolute left-[61%] top-[15%]"
        >
          <img
            src={exercisesound}
            alt="Exercises Button"
            className="w-auto h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div
          onClick={() => handleClick("Activities")}
          className="hover:cursor-pointer absolute w-auto left-[60%] top-[41%]"
        >
          <img
            src={activitysound}
            alt="Activities Button"
            className="w-auto h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* 🟠 Exercises Popup */}
{clicked && clickedID === "Exercises" && (
  <div
    className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-cover bg-center overflow-auto"
    style={{ backgroundImage: `url("/Bg/exerciseactivitysound.webp")` }}
  >
    {/* Exit button */}
    <div
      onClick={handleExit}
      className="fixed right-4 top-4 bg-red-600 h-10 w-10 flex justify-center items-center text-white rounded-full cursor-pointer z-50"
    >
      X
    </div>

    {/* Animal sounds container */}
    <div className="relative w-full h-[500px] mt-16">
      <img
        src={dogsound}
        alt="Dog"
        className="absolute top-[96%] left-[10%] cursor-pointer hover:scale-105 transition-transform duration-300"
        style={{ transform: "translate(-50%, -50%)" }}
        onClick={() => playSound(dogbark)}
      />
      <img
        src={catsound}
        alt="Cat"
        className="absolute top-[61%] left-[20%] cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => playSound(catmeow)}
      />
      <img
        src={cowsound}
        alt="Cow"
        className="absolute top-[30%] left-[35%] cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => playSound(cowmoo)}
      />
      <img
        src={ducksound}
        alt="Duck"
        className="absolute top-[53%] left-[85%] cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => playSound(duckquack)}
      />
      <img
        src={pigsound}
        alt="Pig"
        className="absolute top-[47%] left-[60%] cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => playSound(pigoink)}
      />
    </div>
  </div>
)}


      {/* 🟣 Activities Popup */}
      {clicked && clickedID === "Activities" && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-center items-center gap-10 bg-cover bg-center"
          style={{ backgroundImage: `url("/Bg/activitybg.webp")` }}
        >
          <div
            onClick={handleExit}
            className="bg-red-600 absolute right-[3%] top-[3%] h-10 w-10 flex justify-center items-center text-white rounded-full cursor-pointer"
          >
            X
          </div>
          <img
            src={act1sound}
            alt="Activity 1"
            onClick={() =>
              handleNavigation("/lessons/animals/lesson1/activity1")
            }
            className="w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
          <img
            src={act2sound}
            alt="Activity 2"
            onClick={() =>
              handleNavigation("/lessons/animals/lesson1/activity2")
            }
            className="w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </div>
      )}
    </>
  );
}

export default AnimalLesson1;
