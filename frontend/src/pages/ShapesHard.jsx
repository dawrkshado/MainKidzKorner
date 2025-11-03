import React, { useState, useEffect } from "react";
import Back from "../components/Back";
import Hard1 from "../assets/Shapes/ShapesHard/level1.webp";
import { Link } from "react-router-dom";
import backgroundMusic from "../assets/Sounds/background.mp3";
import useSound from "use-sound";
import clickSfx from "../assets/Sounds/button_click.mp3";

const saveProgress = () => {
  const progress =
    JSON.parse(localStorage.getItem("shapesHardProgress")) || {
      level1: false,
    };

  progress.level1 = true;
  localStorage.setItem("shapesHardProgress", JSON.stringify(progress));
};

function ShapesHard() {
  const [playClick] = useSound(clickSfx, { volume: 0.5 });
  const [progress, setProgress] = useState({ level1: false });
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);

  const getHardProgress = () => {
    return (
      JSON.parse(localStorage.getItem("shapesHardProgress")) || {
        level1: false,
      }
    );
  };

  useEffect(() => {
    setProgress(getHardProgress());
  }, []);

  const saveHardReset = () => {
    const resetState = { level1: false };
    localStorage.setItem("shapesHardProgress", JSON.stringify(resetState));
    setProgress(resetState);
  };

  const handleResetConfirmed = () => {
    setShowResetModal(false);
    playClick();

    saveHardReset();
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  const promptReset = () => {
    playClick();
    setShowResetModal(true);
  };

  useEffect(() => {
    const bgSound = new Audio(backgroundMusic);
    bgSound.loop = true;
    bgSound.volume = 0.2;

    bgSound
      .play()
      .catch((err) =>
        console.log("Autoplay blocked. User must interact to enable sound.", err)
      );

    return () => {
      bgSound.pause();
      bgSound.currentTime = 0;
    };
  }, []);

  return (
    <>
      <div className="absolute flex justify-around overflow-y-hidden h-[100vh] w-[100vw]">
        <div className="absolute top-0 left-0 w-full z-10">
        </div>

        <div className="absolute top-12.5 left-0 h-15 w-30 z-10">
          <Back />
        </div>

        <div className="absolute top-[5px] left-[1350px] z-20">
          <button
            onClick={promptReset}
            className="bg-green-500 hover:bg-red-700 text-white py-2 px-4 rounded-full shadow-lg transition duration-150 ease-in-out transform hover:scale-105"
            title="Reset Hard Mode Progress"
          >
            🔄 Reset Game
          </button>
        </div>

        {showResetModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full transform transition-all scale-100 duration-300">
              <h2 className="text-xl text-green-600 mb-4">
                Reset Game Confirmation
              </h2>
              <p className="mb-6 text-gray-700">
                Are you sure you want to reset the game?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowResetModal(false);
                    playClick();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetConfirmed}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccessToast && (
          <div className="fixed top-20 right-5 z-50">
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-xl flex items-center space-x-3 transition-opacity duration-300">
              <span className="text-2xl">🎉</span>
              <p>Hard Mode progress has been reset!</p>
            </div>
          </div>
        )}

        <img
          src="/Bg/Shapes/shapesHardBg.webp"
          alt=""
          className="h-[100vh] w-[100vw] absolute"
        />

        <Link to="level1" onClick={playClick}>
          <img
            src={Hard1}
            alt="Button for level1"
            className="absolute left-[50%] bottom-0 h-[60%] hover:opacity-85 motion-preset-pulse-sm motion-duration-2000"
          />

          {progress.level1 && (
            <span
              className="absolute text-4xl text-green-500 font-bold"
              style={{
                left: "60%",
                bottom: "55%",
                transform: "translate(-50%, -50%)",
              }}
            >
              ✅
            </span>
          )}
        </Link>
      </div>
    </>
  );
}

export default ShapesHard;
