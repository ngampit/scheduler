import {
  useState
} from "react";
import React from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = function (newMode, replace) {
    const newHistory = [...history];
    if (replace) {
      newHistory.pop();
    }
    newHistory.push(newMode);
    setHistory(newHistory);
    setMode(newMode);

  };

  const back = function () {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      const newHistory = [...history];
      setHistory(newHistory);

    }

  };
  return {
    mode,
    transition,
    back
  };
};