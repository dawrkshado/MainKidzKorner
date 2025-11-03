import { useTimer } from "../TimeProvider.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function UnlockOverlay() {
  const {
    inputHours,
    setInputHours,
    inputMinutes,
    setInputMinutes,
    inputSeconds,
    setInputSeconds,
    timeLeft,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    formatTime,
    showLock,
    setShowLock,
    showSetup,
    setShowSetup,
    enteredCode,
    setEnteredCode,
    verifyCode,
  } = useTimer();

  const [showNewSetup, setShowNewSetup] = useState(false);
  const navigate = useNavigate();

  // 🧠 Reset overlays when entering this page
  useEffect(() => {
    setShowLock(false);
    setShowSetup(false);
    setShowNewSetup(false);
    setEnteredCode("");
  }, [setShowLock, setShowSetup, setEnteredCode]);

  const handleNewSetup = () => {
    setShowSetup(false);
    setShowNewSetup(true);
  };

  const handleConfirmNewTimer = () => {
    startTimer();
    setShowNewSetup(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 relative overflow-hidden">
      {/* Timer Card */}
      <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-80 z-10">
        <h1 className="text-2xl font-bold mb-4 text-amber-700">
          Parental Timer <br />
          <span className="text-lg text-red-500">Set Timer to lock Screen</span>
        </h1>

        {/* Timer Inputs */}
        {!isRunning && !showNewSetup && (
          <div className="flex gap-2 justify-center mb-4">
            {/* Hours Input */}
            <input
              type="number"
              className="border-2 border-amber-300 rounded-lg p-2 w-16 text-center"
              placeholder="HH"
              value={inputHours}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || Number(val) >= 0) {
                  setInputHours(val === "" ? "" : Number(val));
                }
              }}
              min="0"
            />

            {/* Minutes Input */}
            <input
              type="number"
              className="border-2 border-amber-300 rounded-lg p-2 w-16 text-center"
              placeholder="MM"
              value={inputMinutes}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (val.length <= 2 && Number(val) <= 59)) {
                  setInputMinutes(val === "" ? "" : Number(val));
                }
              }}
              min="0"
              max="59"
            />

            {/* Seconds Input */}
            <input
              type="number"
              className="border-2 border-amber-300 rounded-lg p-2 w-16 text-center"
              placeholder="SS"
              value={inputSeconds}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (val.length <= 2 && Number(val) <= 59)) {
                  setInputSeconds(val === "" ? "" : Number(val));
                }
              }}
              min="0"
              max="59"
            />
          </div>
        )}

        {/* Timer Display */}
        <div className="text-4xl font-mono mb-6 text-amber-800">
          {formatTime(timeLeft)}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-2">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
            >
              Start
            </button>
          ) : (
            <button
              onClick={stopTimer}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Stop
            </button>
          )}
          <button
            onClick={resetTimer}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 🔒 Lock Screen */}
      <AnimatePresence>
        {showLock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white z-50"
          >
            <h2 className="text-3xl mb-4 font-bold">🔒 Time’s Up!</h2>
            <p className="mb-4">Enter parental code to continue:</p>
            <input
              type="password"
              maxLength="4"
              className="bg-white text-black rounded-lg p-2 text-center w-40 mb-4"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
            />
            <button
              onClick={verifyCode}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
            >
              Unlock
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧩 After Unlock Options */}
      <AnimatePresence>
        {showSetup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white z-50"
          >
            <h2 className="text-3xl mb-6 font-bold">✅ System Unlocked</h2>
            <p className="mb-6 text-gray-300">Choose what to do next:</p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleNewSetup}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Set Up New Timer
              </button>
              <button
                onClick={() => {
                  setShowSetup(false);
                  navigate("/parentsKorner");
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Go to Parents Korner
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⏰ New Timer Setup Popup */}
      <AnimatePresence>
        {showNewSetup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white z-50"
          >
            <div className="bg-white text-black rounded-2xl p-6 w-[40%] text-center">
              <h2 className="text-2xl font-bold mb-4">Set a New Timer</h2>

              <div className="flex gap-2 justify-center mb-4">
                <label className="flex items-center">Hours:</label>
                <input
                  type="number"
                  className="border-2 border-amber-300 rounded-lg p-2 w-16 text-center"
                  value={inputHours}
                  onChange={(e) => setInputHours(Number(e.target.value))}
                  min="0"
                />
                <label className="flex items-center">Minutes:</label>
                <input
                  type="number"
                  className="border-2 border-amber-300 rounded-lg p-2 w-16 text-center"
                  value={inputMinutes}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || (val.length <= 2 && Number(val) <= 59)) {
                      setInputMinutes(val === "" ? "" : Number(val));
                    }
                  }}
                  min="0"
                  max="59"
                />
                <label className="flex items-center">Seconds:</label>
                <input
                  type="number"
                  className="border-2 border-amber-300 rounded-lg p-2 w-16 text-center"
                  value={inputSeconds}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || (val.length <= 2 && Number(val) <= 59)) {
                      setInputSeconds(val === "" ? "" : Number(val));
                    }
                  }}
                  min="0"
                  max="59"
                />
              </div>

              <div className="flex justify-center gap-2">
                <button
                  onClick={handleConfirmNewTimer}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowNewSetup(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UnlockOverlay;
