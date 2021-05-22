import React, {useState} from "react";

// state setter for the operation modes
const useVisualMode = (initial) => {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {

    setMode(newMode);
    if (replace) {
      history = history.slice(0,-1);
    };
    setHistory(history => ([...history, newMode]));
  };

  const back = () => {
    history = history.slice(0,-1);
    setHistory(history => ([...history, newMode]));
    const newMode = history[history.length - 1];
    setMode(newMode);
  };

  return { mode, transition, back };
}


  export default useVisualMode