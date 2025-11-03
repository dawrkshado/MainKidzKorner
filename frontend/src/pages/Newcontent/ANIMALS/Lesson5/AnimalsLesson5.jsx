import { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Buttons & background images
import exercisepet from "../../../../assets/Animals/exercisepet.webp";
import activitypet from "../../../../assets/Animals/activitypet.webp";
import act1pet from "../../../../assets/Animals/act1pet.webp";
import act2pet from "../../../../assets/Animals/act2pet.webp";

import petlifeBtn from "../../../../assets/Animals/ExercisePet/petlife.webp";
import wildlifeBtn from "../../../../assets/Animals/ExercisePet/wildlife.webp";

import petBg from "../../../../assets/Animals/ExercisePet/petanimals.webp";
import wildBg from "../../../../assets/Animals/ExercisePet/wildanimals.webp";

// ✅ Fixed the video import path (4 levels up)
import animalpetvid from "../../../../assets/Animals/ExerciseVideo/animalpetvid.mp4";
import api from "../../../../api";

function AnimalLesson5() {
  const [clicked, setClicked] = useState();
  const [clickedID, setClickedID] = useState();
  const [zone, setZone] = useState(null);
  const navigate = useNavigate();
  const videoRef = useRef(null);
   const [isActivity1Done, setIsActivity1Done] = useState(false);
  const selectedChild = JSON.parse(localStorage.getItem("selectedChild"));
  const childId = selectedChild?.id;
  
  const [loadingProgress, setLoading] = useState(true); // optional: show loading spinner

  useEffect(() => {
  const checkLesson5Activity1 = async () => {
    try {
      const res = await api.get(`/api/time_completions/?child=${childId}`);
      const completions = res.data.results ? res.data.results : res.data;

      const hasActivity1 = completions.some(
        (item) => item.game_level?.game_name === "Lesson5 Activity1"
      );

      setIsActivity1Done(hasActivity1);
    } catch (err) {
      console.error("Error checking Lesson5 Activity1 completion:", err);
    } finally {
      setLoading(false);
    }
  };

  if (childId) checkLesson5Activity1();
}, [childId]);
  

 const handleClick = (button) => {
    setZone(null)
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
    setZone(null)

    // Resume main video when closing popup
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

    const handleActivity2Click = () => {
    if (!isActivity1Done) {
      alert("Please finish Activity 1 first!");
      return;
    }
    navigate("/lessons/animals/lesson5/activity2");
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
        <div className="absolute top-[10%] left-[30%] transform -translate-x-1/2 w-[48%]">
          <video
            ref={videoRef}
            src={animalpetvid}
            controls
            autoPlay
            loop
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* Exercises & Activities buttons */}
        <div
          onClick={() => handleClick("Exercises")}
          className="hover:cursor-pointer absolute left-[61%] top-[15%] motion-preset-pulse-sm motion-duration-2000"
        >
          <img
            src={exercisepet}
            alt="Exercises Button"
            className="w-auto h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div
          onClick={() => handleClick("Activities")}
          className="hover:cursor-pointer absolute w-auto left-[60%] top-[41%]"
        >
          <img
            src={activitypet}
            alt="Activities Button"
            className="w-auto h-auto hover:scale-105 transition-transform duration-300 motion-preset-pulse-sm motion-duration-2000"
          />
        </div>
      </div>

      {/* Exercises Popup */}
      {clicked && clickedID === "Exercises" && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-200">
          {/* Exit Button */}
          <div
            onClick={handleExit}
            className="bg-red-600 absolute right-6 top-6 h-10 w-10 rounded-full flex items-center justify-center cursor-pointer"
          >
            <p className="text-white font-bold">X</p>
          </div>

          {/* If zone not selected, show full-screen buttons */}
          {!zone && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full h-full">
              <img
                src={petlifeBtn}
                alt="Pet Life Button"
                className="w-auto md:w-1/3 h-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setZone("pet")}
              />
              <img
                src={wildlifeBtn}
                alt="Wild Life Button"
                className="w-auto md:w-1/3 h-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setZone("wild")}
              />
            </div>
          )}

          {/* If zone selected, show corresponding background */}
          {zone && (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${zone === "pet" ? petBg : wildBg})`,
              }}
            />
          )}
        </div>
      )}

      {/* Activities Popup */}
      {clicked && clickedID === "Activities" && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-center items-center gap-10 bg-cover bg-center"
          style={{ backgroundImage: `url("/Bg/activitybg.webp")` }}
        >
          <div
            onClick={handleExit}
            className="bg-red-600 absolute right-[3%] top-[3%] h-10 w-10 rounded-4xl flex items-center justify-center cursor-pointer"
          >
            <p>X</p>
          </div>
          <img
            src={act1pet}
            alt="Activity 1"
            onClick={() => navigate("/lessons/animals/lesson5/activity1")}
            className="w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
           <img
                                                src={act2pet}
                                                alt="Activity 2"
                                                onClick={handleActivity2Click}
                                                className={`w-auto transition-transform duration-300 ${
                                                  isActivity1Done
                                                    ? "hover:scale-105 cursor-pointer"
                                                    : "opacity-50 cursor-not-allowed"
                                                }`}
                                              />
        </div>
      )}
    </>
  );
}

export default AnimalLesson5;
