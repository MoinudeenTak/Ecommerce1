import { useEffect } from "react";

const useAutoLogout = (logout, timeout) => {
  useEffect(() => {
    const updateActivity = () => {
      localStorage.setItem("lastActivity", Date.now());
    };

    const checkActivity = () => {
      const lastActivity = localStorage.getItem("lastActivity");
      const now = Date.now();

      if (lastActivity && now - lastActivity > timeout) {
        logout();
      }
    };

    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) =>
      window.addEventListener(event, updateActivity)
    );

    const interval = setInterval(checkActivity, 5000);

    updateActivity();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, updateActivity)
      );
      clearInterval(interval);
    };
  }, [logout, timeout]);
};

export default useAutoLogout;