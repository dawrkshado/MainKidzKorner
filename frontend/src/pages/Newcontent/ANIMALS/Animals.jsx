import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import baby from "../../../assets/Animals/baby.webp";
import live from "../../../assets/Animals/live.webp";
import move from "../../../assets/Animals/move.webp";
import pet from "../../../assets/Animals/pet.webp";
import sound from "../../../assets/Animals/sound.webp";
import { useEffect, useState } from "react";
import api from "../../../api";

function Animals() {
  const [completedGames, setCompletedGames] = useState({});
  const selectedChild = JSON.parse(localStorage.getItem("selectedChild"));
  const childId = selectedChild?.id;

  useEffect(() => {
  const fetchCompletions = async () => {
    try {
      const res = await api.get(`/api/time_completions/?child=${childId}`);
      const completed = {};
      res.data.forEach((item) => {
        // ✅ Correct way to access the nested field
        const gameName = item.game_level?.game_name;
        if (gameName) {
          completed[gameName.trim().toLowerCase()] = true;
        }
      });
      console.log("✅ Completed from backend:", completed); // Debug
      setCompletedGames(completed);
    } catch (err) {
      console.error("Error fetching completions:", err);
    }
  };

  if (childId) fetchCompletions();
}, [childId]);


  // 🔒 PROGRESSION LOGIC — unlock next lesson only if both previous activities are done
  const canAccess = {
    "lesson1 activity1": true, // always open
    "lesson1 activity2": completedGames["lesson1 activity1"] || false,

    "lesson2 activity1":
      completedGames["lesson1 activity1"] && completedGames["lesson1 activity2"],
    "lesson2 activity2": completedGames["lesson2 activity1"] || false,

    "lesson3 activity1":
      completedGames["lesson2 activity1"] && completedGames["lesson2 activity2"],
    "lesson3 activity2": completedGames["lesson3 activity1"] || false,

    "lesson4 activity1":
      completedGames["lesson3 activity1"] && completedGames["lesson3 activity2"],
    "lesson4 activity2": completedGames["lesson4 activity1"] || false,

    "lesson5 activity1":
      completedGames["lesson4 activity1"] && completedGames["lesson4 activity2"],
    "lesson5 activity2": completedGames["lesson5 activity1"] || false,
  };

  return (
    <>
      <Helmet>
        <title>Animals | KidzKorner</title>
        <meta
          name="Lessons About animals"
          content="Will have lessons about animals that can further enhance their knowledge"
        />
      </Helmet>

      <div className="relative w-full min-h-screen">
        <img
          src="/Bg/animallessonbg.webp"
          alt="background"
          className="w-full h-auto block"
        />

        <div className="content-center place-items-center">
          <ul className="text-center">
            {/* Lesson 1 - SOUND */}
            <li>
              <Link
                to={
                  canAccess["lesson1 activity1"]
                    ? "/lessons/animals/lesson1"
                    : "#"
                }
              >
                <img
                  src={sound}
                  alt="Animals Sound"
                  className={`absolute left-[20%] top-[20%] w-auto h-auto transition-transform duration-300 ${
                    canAccess["lesson1 activity1"]
                      ? "hover:scale-105 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                />
              </Link>
            </li>

            {/* Lesson 2 - MOVE */}
            <li>
              <Link
                to={
                  canAccess["lesson2 activity1"]
                    ? "/lessons/animals/lesson2"
                    : "#"
                }
              >
                <img
                  src={move}
                  alt="Animals Move"
                  className={`absolute left-[45%] top-[20%] w-auto h-auto transition-transform duration-300 ${
                    canAccess["lesson2 activity1"]
                      ? "hover:scale-105 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                />
              </Link>
            </li>

            {/* Lesson 3 - BABY */}
            <li>
              <Link
                to={
                  canAccess["lesson3 activity1"]
                    ? "/lessons/animals/lesson3"
                    : "#"
                }
              >
                <img
                  src={baby}
                  alt="Animals Baby"
                  className={`absolute left-[70%] top-[20%] w-auto h-auto transition-transform duration-300 ${
                    canAccess["lesson3 activity1"]
                      ? "hover:scale-105 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                />
              </Link>
            </li>

            {/* Lesson 4 - LIVE */}
            <li>
              <Link
                to={
                  canAccess["lesson4 activity1"]
                    ? "/lessons/animals/lesson4"
                    : "#"
                }
              >
                <img
                  src={live}
                  alt="Animals Live"
                  className={`absolute left-[30%] top-[50%] w-auto h-auto transition-transform duration-300 ${
                    canAccess["lesson4 activity1"]
                      ? "hover:scale-105 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                />
              </Link>
            </li>

            {/* Lesson 5 - PET */}
            <li>
              <Link
                to={
                  canAccess["lesson5 activity1"]
                    ? "/lessons/animals/lesson5"
                    : "#"
                }
              >
                <img
                  src={pet}
                  alt="Animals Pet"
                  className={`absolute left-[60%] top-[50%] w-auto h-auto transition-transform duration-300 ${
                    canAccess["lesson5 activity1"]
                      ? "hover:scale-105 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Animals;
