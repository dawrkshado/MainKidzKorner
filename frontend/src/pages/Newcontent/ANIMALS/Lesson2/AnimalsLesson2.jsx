import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import act1move from "../../../../assets/Animals/act1move.webp";
import act2move from "../../../../assets/Animals/act2move.webp";
import exercisemove from "../../../../assets/Animals/exercisemove.webp";
import activitymove from "../../../../assets/Animals/activitymove.webp";
import ExerciseLesson2 from "../../../../assets/Animals/ExerciseLesson2.webp";

// Animal images
import birdaction from "../../../../assets/Animals/ExerciseAction/birdaction.webp";
import fishaction from "../../../../assets/Animals/ExerciseAction/fishaction.webp";
import horseaction from "../../../../assets/Animals/ExerciseAction/horseaction.webp";
import rabbitaction from "../../../../assets/Animals/ExerciseAction/rabbitaction.webp";
import snakeaction from "../../../../assets/Animals/ExerciseAction/snakeaction.webp";

// ✅ Corrected path here
import animalactionvid from "../../../../assets/Animals/ExerciseVideo/animalactionvid.mp4";

function AnimalLesson2() {
  const [clicked, setClicked] = useState(false);
  const [clickedID, setClickedID] = useState(null);
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState("");
  const videoRef = useRef(null);
  const navigate = useNavigate();

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

  // Pause video whenever a modal opens
  if (videoRef.current) {
    videoRef.current.pause();
  }

  if (button === "Exercises") {
    newQuestion();
  }
};


 const handleExit = () => {
  setClicked(false);
  setClickedID(null);
  setQuestion(null);
  setFeedback("");

  if (videoRef.current) {
    videoRef.current.play();
  }
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

  return (
    <>
      <div className="relative w-full min-h-screen overflow-y-auto">
        <img
          src="/Bg/mainvidbg.webp"
          alt="Main background"
          className="w-full h-auto block"
        />
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
          className="hover:cursor-pointer absolute left-[61%] top-[15%] motion-preset-pulse-sm motion-duration-2000"
        >
          <img
            src={exercisemove}
            alt="Exercises Button"
            className="w-auto h-auto hover:scale-105 transition-transform duration-300 "
          />
        </div>

        {/* ACTIVITIES BUTTON */}
        <div
          onClick={() => handleClick("Activities")}
          className="hover:cursor-pointer absolute w-auto left-[60%] top-[41%] motion-preset-pulse-sm motion-duration-2000"
        >
          <img
            src={activitymove}
            alt="Activities Button"
            className="w-auto h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* EXERCISE MODAL */}
{clicked && clickedID === "Exercises" && question && (
  <div
    className="fixed inset-0 z-50 flex justify-center items-center bg-cover bg-center"
    style={{ backgroundImage: `url(${ExerciseLesson2})` }}
  >
    {/* Exit button */}
    <button
      onClick={handleExit}
      className="fixed right-4 top-4 bg-red-600 h-10 w-10 flex items-center justify-center rounded-full cursor-pointer z-50"
    >
      X
    </button>

    {/* Question */}
    <p className="text-3xl font-bold mb-8 absolute top-[5%] text-center w-full">
      What animal is {question.action}?
    </p>

    {/* Animal images positioned freely */}
    <div className="relative w-full h-[80vh]">
      <img
        src={snakeaction}
        alt="Snake"
        onClick={() => handleAnswer("snake")}
        className="absolute top-[50%] left-[5%] w-auto cursor-pointer hover:scale-110 transition-transform duration-300"
      />
      <img
        src={rabbitaction}
        alt="Rabbit"
        onClick={() => handleAnswer("rabbit")}
        className="absolute top-[12%] left-[80%] w-auto cursor-pointer hover:scale-110 transition-transform duration-300"
      />
      <img
        src={horseaction}
        alt="Horse"
        onClick={() => handleAnswer("horse")}
        className="absolute top-[55%] left-[30%] w-auto cursor-pointer hover:scale-110 transition-transform duration-300"
      />
      <img
        src={fishaction}
        alt="Fish"
        onClick={() => handleAnswer("fish")}
        className="absolute top-[88%] left-[75%] w-auto cursor-pointer hover:scale-110 transition-transform duration-300"
      />
      <img
        src={birdaction}
        alt="Bird"
        onClick={() => handleAnswer("bird")}
        className="absolute top-[10%] left-[50%] w-auto cursor-pointer hover:scale-110 transition-transform duration-300"
      />
    </div>

    {/* Feedback */}
    {feedback && (
      <p className="mt-6 text-5xl font-semibold absolute bottom-[50%] text-center w-full">
        {feedback}
      </p>
    )}
  </div>
)}


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

          <img
            src={act1move}
            alt="Activity 1"
            onClick={() => navigate("/lessons/animals/lesson2/activity1")}
            className="w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
          />

          <img
            src={act2move}
            alt="Activity 2"
            onClick={() => navigate("/lessons/animals/lesson2/activity2")}
            className="w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </div>
      )}
    </>
  );
}

export default AnimalLesson2;
