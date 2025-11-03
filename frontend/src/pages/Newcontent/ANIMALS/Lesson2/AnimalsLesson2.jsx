import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import act1move from "../../../../assets/Animals/act1move.webp";
import act2move from "../../../../assets/Animals/act2move.webp";
import exercisemove from "../../../../assets/Animals/exercisemove.webp";
import activitymove from "../../../../assets/Animals/activitymove.webp";
import ExerciseLesson2 from "../../../../assets/Animals/ExerciseLesson2.webp";
import api from "../../../../api"; // ✅ import your API instance

// Animal images
import birdaction from "../../../../assets/Animals/ExerciseAction/birdaction.webp";
import fishaction from "../../../../assets/Animals/ExerciseAction/fishaction.webp";
import horseaction from "../../../../assets/Animals/ExerciseAction/horseaction.webp";
import rabbitaction from "../../../../assets/Animals/ExerciseAction/rabbitaction.webp";
import snakeaction from "../../../../assets/Animals/ExerciseAction/snakeaction.webp";
import animalactionvid from "../../../../assets/Animals/ExerciseVideo/animalactionvid.mp4";

function AnimalLesson2() {
  const [clicked, setClicked] = useState(false);
  const [clickedID, setClickedID] = useState(null);
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isActivity1Done, setIsActivity1Done] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const selectedChild = JSON.parse(localStorage.getItem("selectedChild"));
  const childId = selectedChild?.id;

  // ✅ Check if Lesson2 Activity1 record exists
  useEffect(() => {
  const checkLesson2Activity1 = async () => {
    try {
      const res = await api.get(`/api/time_completions/?child=${childId}`);
      const completions = res.data.results ? res.data.results : res.data;

      const hasActivity1 = completions.some(
        (item) => item.game_level?.game_name === "Lesson2 Activity1"
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


  const animals = [
    { name: "snake", img: snakeaction, action: "slithering" },
    { name: "rabbit", img: rabbitaction, action: "jumping" },
    { name: "horse", img: horseaction, action: "running" },
    { name: "fish", img: fishaction, action: "swimming" },
    { name: "bird", img: birdaction, action: "flying" },
  ];

  const handleClick = (button) => {
    setClicked(true);
    setClickedID(button);
    if (button === "Exercises") newQuestion();
  };

  const handleExit = () => {
    setClicked(false);
    setClickedID(null);
    setQuestion(null);
    setFeedback("");
  };

  const newQuestion = () => {
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    setQuestion(randomAnimal);
    setFeedback("");
  };

  const handleAnswer = (selected) => {
    if (selected === question.name) {
      setFeedback("✅ Correct!");
      setTimeout(() => newQuestion(), 1500);
    } else {
      setFeedback("❌ Try again!");
    }
  };

  const handleActivity2Click = () => {
    if (!isActivity1Done) {
      alert("Please finish Activity 1 first!");
      return;
    }
    navigate("/lessons/animals/lesson2/activity2");
  };

  return (
    <>
      <div className="relative w-full min-h-screen overflow-y-auto">
        <img src="/Bg/mainvidbg.webp" alt="Main background" className="w-full h-auto block" />
        <div className="absolute top-[10%] left-[30%] transform -translate-x-1/2 w-[48%]">
          <video
            ref={videoRef}
            src={animalactionvid}
            controls
            autoPlay
            loop
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* EXERCISE BUTTON */}
        <div
          onClick={() => handleClick("Exercises")}
          className="hover:cursor-pointer absolute left-[61%] top-[15%]"
        >
          <img
            src={exercisemove}
            alt="Exercises Button"
            className="w-auto h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* ACTIVITIES BUTTON */}
        <div
          onClick={() => handleClick("Activities")}
          className="hover:cursor-pointer absolute w-auto left-[60%] top-[41%]"
        >
          <img
            src={activitymove}
            alt="Activities Button"
            className="w-auto h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* ACTIVITIES MODAL */}
      {clicked && clickedID === "Activities" && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-center items-center gap-10 bg-cover bg-center"
          style={{ backgroundImage: `url("/Bg/activitybg.webp")` }}
        >
          <div
            onClick={handleExit}
            className="bg-red-600 absolute right-[3%] top-[3%] h-10 w-10 flex items-center justify-center rounded-full hover:cursor-pointer"
          >
            <p>X</p>
          </div>

          {/* Activity 1 */}
          <img
            src={act1move}
            alt="Activity 1"
            onClick={() => navigate("/lessons/animals/lesson2/activity1")}
            className="w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
          />

          {/* Activity 2 (Disabled if Activity 1 not done) */}
          <img
            src={act2move}
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

export default AnimalLesson2;
