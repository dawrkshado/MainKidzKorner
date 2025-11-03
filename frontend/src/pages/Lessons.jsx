import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Back from "../components/Back";
import animal from "../assets/Lessons/animal.webp";
import weather from "../assets/Lessons/weather.webp";
import senses from "../assets/Lessons/senses.webp";
import reading from "../assets/Lessons/reading.webp";

function Lessons() {
  return (
    <>
      <Helmet>
        <title>Lessons | KidzKorner</title>
        <meta
          name="Lessons that can be used after class"
          content="Different buttons for different lessons"
        />
      </Helmet>

      <div className="relative w-full min-h-screen">
        <img
          src="/Bg/lessonbg.webp"
          alt="background"
          className="w-full h-auto block"
        />

        <div className="absolute top-5 left-5 z-10">
          <Back />
        </div>

        <div className="absolute top-0 left-0 w-full h-full">
          <div className="h-[90%] w-[90%] grid grid-flow-col grid-rows-2 gap-15 [&>*]:content-center [&>*]:text-center [&>*]:rounded-2xl">
            <Link to="/lessons/animals">
              <img
                src={animal}
                alt="Buttons for Animals"
                className="absolute left-[20%] top-[20%] w-auto h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </Link>

            <Link to="/lessons/weather">
              <img
                src={weather}
                alt="Buttons for weather"
                className="absolute left-[65%] top-[20%] w-auto h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </Link>

            <Link to="/lessons/senses">
              <img
                src={senses}
                alt="Buttons for senses"
                className="absolute left-[20%] top-[58%] w-auto h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </Link>

            <Link to="/lessons/reading">
              <img
                src={reading}
                alt="Buttons for reading"
                className="absolute left-[65%] top-[58%] w-auto h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lessons;
