import { useEffect, useRef } from "react";

const useMultiTabAutoLogout = (
  logout,
  isAuthenticated,
  timeout = 500000
) => {
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const resetTimer = () => {
      clearTimeout(timerRef.current);

      localStorage.setItem("last-activity", Date.now());

      timerRef.current = setTimeout(() => {
        localStorage.setItem("logout-event", Date.now());
        logout();
      }, timeout);
    };

    const handleStorage = (event) => {
      if (event.key === "logout-event") {
        logout();
      }

      if (event.key === "last-activity") {
        resetTimer();
      }
    };

    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    window.addEventListener("storage", handleStorage);

    resetTimer();

    return () => {
      clearTimeout(timerRef.current);

      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );

      window.removeEventListener("storage", handleStorage);
    };
  }, [logout, isAuthenticated, timeout]);
};

export default useMultiTabAutoLogout;