import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const useAutoLogout = (isAuthenticated, logout, timeout = 300000) => {
  const navigate = useNavigate();
  const timer = useRef(null);

  const resetTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      logout(); // clear auth state
      navigate("/");
      alert("Session expired due to inactivity");
    }, timeout);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // start timer initially

    return () => {
      if (timer.current) clearTimeout(timer.current);

      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [isAuthenticated]);
};

export default useAutoLogout;