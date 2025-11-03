// TimeProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext();

export function TimeProvider({ children }) {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("timeLeft");
    return saved ? JSON.parse(saved) : 0;
  });

  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem("isRunning");
    return saved ? JSON.parse(saved) : false;
  });

  const [showLock, setShowLock] = useState(() => {
    const saved = localStorage.getItem("showLock");
    return saved ? JSON.parse(saved) : false;
  });

  const [showSetup, setShowSetup] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");

  // 🧠 Load and persist code
  const [code, setCode] = useState(() => localStorage.getItem("parentCode") || "");

  const totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;

  // Save important state
  useEffect(() => {
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
    localStorage.setItem("isRunning", JSON.stringify(isRunning));
    localStorage.setItem("showLock", JSON.stringify(showLock));
  }, [timeLeft, isRunning, showLock]);

  // 🕒 Start Timer (requires code)
  const startTimer = () => {
    if (totalSeconds <= 0) {
      alert("Please set a valid time before starting.");
      return;
    }

    // Require code before starting if not set
    if (!code) {
      const newCode = prompt("Enter a 4-letter parental code to lock the timer:");
      if (!newCode || newCode.length !== 4) {
        alert("You must enter a 4-letter code to start the timer.");
        return;
      }
      setCode(newCode);
      localStorage.setItem("parentCode", newCode);
    }

    setTimeLeft(totalSeconds);
    setIsRunning(true);
    setShowSetup(false);
  };

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setInputHours(0);
    setInputMinutes(0);
    setInputSeconds(0);
  };

  // ⏳ Countdown logic
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRunning(false);
            setShowLock(true);
            localStorage.setItem("showLock", "true");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 🔓 Verify code and reset
  const verifyCode = () => {
    if (enteredCode === code) {
      setShowLock(false);
      localStorage.setItem("showLock", "false");
      setEnteredCode("");

      // 🧹 Clear old code after unlock
      setCode("");
      localStorage.removeItem("parentCode");

      resetTimer();
      setShowSetup(true);
    } else {
      alert("Incorrect code. Try again.");
      setEnteredCode("");
    }
  };

  return (
    <TimerContext.Provider
      value={{
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
        enteredCode,
        setEnteredCode,
        verifyCode,
        code,
        setCode,
        showSetup,
        setShowSetup,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => useContext(TimerContext);
