import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import baby from "../../../assets/Animals/baby.webp";
import live from "../../../assets/Animals/live.webp";
import move from "../../../assets/Animals/move.webp";
import pet from "../../../assets/Animals/pet.webp";
import sound from "../../../assets/Animals/sound.webp";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

function Animals() {

  const [isActivity2Done, setIsActivity1Done] = useState(false);
  const [finished,setFinished] = useState()
  
  const navigate = useNavigate()
  useEffect(() => {
    const activity1Status = localStorage.getItem("lesson1Activity2Done") === "true";
    setIsActivity1Done(activity1Status);
  }, []);
  

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
            <li>
              <Link to="/lessons/animals/lesson3">
                <img
                  src={baby}
                  alt="Buttons for Animals Baby"
                  className="absolute left-[70%] top-[20%] w-auto h-auto cursor-pointer hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </Link>
            </li>

            <li>
              <Link to="/lessons/animals/lesson4">
                <img
                  src={live}
                  alt="Buttons for Animals live"
                  className="absolute left-[30%] top-[50%] w-auto h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </Link>
            </li>

            <li>
         
                <img
                  src={move}
                  alt="Buttons for Animals move"
                        onClick={() => {
    if (isActivity2Done) {
      navigate("/lessons/animals/lesson2");
    }
  }}
  className={`w-auto transition-transform duration-300 ${
    isActivity2Done
      ? "hover:scale-105 cursor-pointer absolute left-[45%] top-[20%] w-auto h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
      : "opacity-50 cursor-not-allowed absolute absolute left-[45%] top-[20%] w-auto h-auto  "
  }`}

                />
 
            </li>

            <li>
              <Link to="/lessons/animals/lesson5">
                <img
                  src={pet}
                  alt="Buttons for Animals pet"
                  className="absolute left-[60%] top-[50%] w-auto h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </Link>
            </li>

            <li>
              <Link to="/lessons/animals/lesson1">
                <img
                  src={sound}
                  alt="Buttons for Animals sound"
                  className="absolute left-[20%] top-[20%] w-auto h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
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
