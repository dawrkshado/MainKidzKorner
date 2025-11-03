// UnlockOverlay.jsx
import { useTimer } from "../TimeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UnlockOverlay() {
  const {
    showSetup,
    setShowSetup,
    setShowLock,
    inputHours,
    setInputHours,
    inputMinutes,
    setInputMinutes,
    inputSeconds,
    setInputSeconds,
    startTimer,
    setEnteredCode,
  } = useTimer();

  const navigate = useNavigate();
  const [showNewTimerSetup, setShowNewTimerSetup] = useState(false);

  if (!showSetup) return null;

  // ✅ Start timer without new code prompt
  const handleNewTimerConfirm = () => {
    setEnteredCode("");
    setShowNewTimerSetup(false);
    setShowSetup(false);
    setShowLock(false);
    startTimer(); // Start timer
  };

  return (
    <AnimatePresence>
      {/* ✅ Default Unlock Overlay */}
      {showSetup && !showNewTimerSetup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex flex-col items-center justify-center text-white"
        >
          <h2 className="text-3xl mb-6 font-bold">✅ System Unlocked</h2>
          <p className="mb-6 text-gray-300">Choose what to do next:</p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setShowSetup(false)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Continue Using Website
            </button>

            <button
              onClick={() => setShowNewTimerSetup(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg"
            >
              Set New Timer
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

      {/* ⏰ New Timer Setup */}
      {showNewTimerSetup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black bg-opacity-90 flex flex-col items-center justify-center text-white"
        >
          <div className="bg-white text-black rounded-2xl p-6 w-[85%] max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-amber-700">
              Set a New Timer
            </h2>

            {/* ⏰ Timer Inputs */}
            <div className="flex justify-center gap-2 mb-6">
              {/* Hours */}
              <input
                type="number"
                className="border-2 border-amber-300 rounded-lg p-2 w-16 text-center"
                placeholder="HH"
                value={inputHours}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || Number(val) <= 10) {
                    setInputHours(val === "" ? "" : Number(val));
                  }
                }}
                min="0"
              />

              {/* Minutes */}
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

              {/* Seconds */}
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

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleNewTimerConfirm}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
              >
                Start Timer
              </button>
              <button
                onClick={() => setShowNewTimerSetup(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UnlockOverlay;
