import { useEffect } from "react";
import { useTimer } from "../TimeProvider";
import { motion, AnimatePresence } from "framer-motion";

function LockOverlay() {
  const { showLock, enteredCode, setEnteredCode, verifyCode } = useTimer();

  // 🚫 Disable page scrolling & clicks when locked
  useEffect(() => {
    if (showLock) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
    }
  }, [showLock]);

  if (!showLock) return null;

  return (
    <AnimatePresence>
      {showLock && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex flex-col items-center justify-center text-white"
          style={{ pointerEvents: "auto" }} // allow clicks on the lock UI
        >
          <h1 className="text-4xl font-bold mb-4">🔒 Locked</h1>
          <p className="mb-4 text-gray-300">
            Time’s up! Enter the parental code to unlock.
          </p>

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
  );
}

export default LockOverlay;
