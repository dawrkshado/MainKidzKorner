import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import act1baby from "../../../../assets/Animals/act1baby.webp";
import act2baby from "../../../../assets/Animals/act2baby.webp";
import exercisebaby from "../../../../assets/Animals/exercisebaby.webp";
import activitybaby from "../../../../assets/Animals/activitybaby.webp";

// Exercise Background
import ExerciseLesson3 from "../../../../assets/Animals/ExerciseLesson3.webp";

// Parent & Baby Animals
import parentdog from "../../../../assets/Animals/ExerciseBaby/parentdog.webp";
import parentcat from "../../../../assets/Animals/ExerciseBaby/parentcat.webp";
import parentcow from "../../../../assets/Animals/ExerciseBaby/parentcow.webp";
import parentsheep from "../../../../assets/Animals/ExerciseBaby/parentsheep.webp";
import parentchicken from "../../../../assets/Animals/ExerciseBaby/parentchicken.webp";


import babydog from "../../../../assets/Animals/ExerciseBaby/babydog.webp";
import babycat from "../../../../assets/Animals/ExerciseBaby/babycat.webp";
import babycow from "../../../../assets/Animals/ExerciseBaby/babycow.webp";
import babysheep from "../../../../assets/Animals/ExerciseBaby/babysheep.webp";
import babychicken from "../../../../assets/Animals/ExerciseBaby/babychicken.webp";

// ✅ Corrected video import path
import animalbabyvid from "../../../../assets/Animals/ExerciseVideo/animalbabyvid.mp4";
import api from "../../../../api";

function AnimalLesson3() {
  const [clicked, setClicked] = useState(false);
  const [clickedID, setClickedID] = useState(null);
  const [revealedBabies, setRevealedBabies] = useState({});
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isActivity1Done, setIsActivity1Done] = useState(false);
  const selectedChild = JSON.parse(localStorage.getItem("selectedChild"));
  const childId = selectedChild?.id;

  useEffect(() => {
  const checkLesson2Activity1 = async () => {
    try {
      const res = await api.get(`/api/time_completions/?child=${childId}`);
      const completions = res.data.results ? res.data.results : res.data;

      const hasActivity1 = completions.some(
        (item) => item.game_level?.game_name === "Lesson3 Activity1"
      );

      setIsActivity1Done(hasActivity1);
    } catch (err) {
      console.error("Error checking Lesson2 Activity1 completion:", err);
    } finally {
      setLoading(false);
    }
  };

  if (childId) checkLesson2Activity1();
}, [childId]);


  const handleClick = (button) => {

    setClicked(true);
    setClickedID(button);

    // Pause main video when opening popup
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleExit = () => {
    setClicked(false);
    setClickedID(null);

    // Resume main video when closing popup
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  
  const handleParentClick = (animalName) => {
    setRevealedBabies((prev) => ({
      ...prev,
      [animalName]: true,
    }));
  };

  const handleActivity2Click = () => {
    if (!isActivity1Done) {
      alert("Please finish Activity 1 first!");
      return;
    }
    navigate("/lessons/animals/lesson3/activity2");
  };


  return (
    <>
      <div className="relative w-full min-h-screen overflow-y-auto">
        <img
          src="/Bg/mainvidbg.webp"
          alt="Main background"
          className="w-full h-auto block"
        />

        {/* ✅ Video Section */}
        <div className="absolute top-[10%] left-[30%] transform -translate-x-1/2 w-[48%] ">
          <video
            ref={videoRef}
            src={animalbabyvid}
            controls
            autoPlay
            loop
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* Exercise Button */}
        <div
          onClick={() => handleClick("Exercises")}
          className="hover:cursor-pointer absolute left-[61%] top-[15%] motion-preset-pulse-sm motion-duration-2000"
        >
          <img
            src={exercisebaby}
            alt="Exercises Button"
            className="w-auto h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Activity Button */}
        <div
          onClick={() => handleClick("Activities")}
          className="hover:cursor-pointer absolute w-auto left-[60%] top-[41%] motion-preset-pulse-sm motion-duration-2000"
        >
          <img
            src={activitybaby}
            alt="Activities Button"
            className="w-auto h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* ✅ Exercise Popup */}
      {clicked && clickedID === "Exercises" && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-cover bg-center overflow-y-auto"
          style={{ backgroundImage: `url(${ExerciseLesson3})` }}
        >
          {/* ❌ X Button */}
          <div
            onClick={handleExit}
            className="bg-red-600 absolute right-[3%] top-[3%] h-10 w-10 rounded-full text-white flex items-center justify-center text-lg font-bold hover:scale-110 cursor-pointer z-[100]"
          >
            X
          </div>

          {/* 🐾 Manually Positioned Animals */}
          <div className="relative w-full h-full z-10">
            {/* 🐶 Dog */}
            <div
              className="absolute top-[50%] left-[38%] flex items-center gap-0 cursor-pointer"
              onClick={() => handleParentClick("dog")}
            >
              <img src={parentdog} alt="Dog" className="w-auto h-auto object-contain" />
              <img
                src={babydog}
                alt="Puppy"
                className={`w-auto h-auto object-contain transition-all duration-700 ${
                  revealedBabies["dog"]
                    ? "grayscale-0 opacity-100 scale-105"
                    : "grayscale brightness-0 opacity-60"
                }`}
              />
            </div>

            {/* 🐱 Cat */}
            <div
              className="absolute top-[78%] left-[50%] flex items-center gap-0 cursor-pointer"
              onClick={() => handleParentClick("cat")}
            >
              <img src={parentcat} alt="Cat" className="w-auto h-auto object-contain" />
              <img
                src={babycat}
                alt="Kitten"
                className={`w-auto h-auto object-contain transition-all duration-700 ${
                  revealedBabies["cat"]
                    ? "grayscale-0 opacity-100 scale-105"
                    : "grayscale brightness-0 opacity-60"
                }`}
              />
            </div>

            {/* 🐮 Cow */}
            <div
              className="absolute top-[57%] left-[0%] flex items-center gap-0 cursor-pointer"
              onClick={() => handleParentClick("cow")}
            >
              <img src={parentcow} alt="Cow" className="w-auto object-contain" />
              <img
                src={babycow}
                alt="Calf"
                className={`w-auto h-auto object-contain transition-all duration-700 ${
                  revealedBabies["cow"]
                    ? "grayscale-0 opacity-100 scale-105"
                    : "grayscale brightness-0 opacity-60"
                }`}
              />
            </div>

            {/* 🐔 Chicken */}
            <div
              className="absolute top-[55%] left-[60%] flex items-center gap-0 cursor-pointer"
              onClick={() => handleParentClick("chicken")}
            >
              <img src={parentchicken} alt="Chicken" className="w-auto h-auto object-contain" />
              <img
                src={babychicken}
                alt="Chick"
                className={`w-auto h-auto object-contain transition-all duration-700 ${
                  revealedBabies["chicken"]
                    ? "grayscale-0 opacity-100 scale-105"
                    : "grayscale brightness-0 opacity-60"
                }`}
              />
            </div>

            {/* 🐑 Sheep */}
            <div
              className="absolute top-[74%] left-[75%] flex items-center gap-0 cursor-pointer"
              onClick={() => handleParentClick("sheep")}
            >
              <img src={parentsheep} alt="Sheep" className="w-[200px] h-auto object-contain" />
              <img
                src={babysheep}
                alt="Lamb"
                className={`w-[200px] h-auto object-contain transition-all duration-700 ${
                  revealedBabies["sheep"]
                    ? "grayscale-0 opacity-100 scale-105"
                    : "grayscale brightness-0 opacity-60"
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* ✅ Activities Popup */}
      {clicked && clickedID === "Activities" && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-center items-center gap-0 bg-cover bg-center"
          style={{ backgroundImage: `url("/Bg/activitybg.webp")` }}
        >
          {/* ❌ X Button */}
          <div
            onClick={handleExit}
            className="bg-red-600 absolute right-[3%] top-[3%] h-10 w-10 rounded-full text-white flex items-center justify-center text-lg font-bold hover:scale-110 cursor-pointer z-[100]"
          >
            X
          </div>

          {/* Activity Buttons */}
          <div className="relative flex flex-col gap-4 z-10">
            <img
              src={act1baby}
              alt="Activity 1"
              onClick={() => navigate("/lessons/animals/lesson3/activity1")}
              className="w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
            <img
                        src={act2baby}
                        alt="Activity 2"
                        onClick={handleActivity2Click}
                        className={`w-auto transition-transform duration-300 ${
                          isActivity1Done
                            ? "hover:scale-105 cursor-pointer"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      />
          </div>
        </div>
      )}
    </>
  );
}

export default AnimalLesson3;
